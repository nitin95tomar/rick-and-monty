'use client'

import React, { useEffect, useState, memo } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchEpisodes } from './actions'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItem from '@mui/material/ListItem'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List'
import { Episode } from 'rickmortyapi'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

function RenderListItem(props: { selected: number, id: number, children: React.ReactNode },params: {}) {
  const router = useRouter();

  if (Number(props.selected)==Number(props.id)) {
    return (<ListItemButton onClick={() => {router.push('/')}} selected >{props.children}</ListItemButton>)
  }
  return (<ListItemButton onClick={() => {router.push(`/${props.id}`)}} >{props.children}</ListItemButton>)
}

const InfiniteScrollMovies = memo(function InfiniteScrollMovies({
  initialEpisodes, initialInfo
}: {
  initialEpisodes: Episode[],
  initialInfo: Info,
}) {
  const [episodes, setEpisodes] = useState(initialEpisodes)
  const [info, setInfo] = useState(initialInfo)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const pathname = usePathname()
  const selected = pathname.split('/').pop()

  async function loadMoreMovies() {
    const nextPage = page + 1
    const { info: info, results: episodes } = await fetchEpisodes({ page: nextPage })
    if (episodes?.length) {
      setPage(nextPage)
      setEpisodes((prev: Episode[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...episodes as Episode[]
      ])
      setInfo((prev: Info) => ({
        ...prev,
        ...info
      }))
    }
  }

  // TODO: wrap loadMoreMovies in useCallback and pass it to the dep array
  useEffect(() => {
    if (inView && page < info.pages) {
      loadMoreMovies()
    }
  }, [inView])

  return (
    <>
      <List>
        {episodes?.map((episode, index) => (
          <ListItem key={episode.id.toString()} disablePadding  >
            <RenderListItem id={episode.id} selected={Number(selected)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={episode.name} />
            </RenderListItem>
          </ListItem>
        ))}
      </List>
      {page < info.pages &&
        <Box sx={{ display: 'flex' }}>
          <CircularProgress ref={ref} />
        </Box>
      }
    </>
  )
}, (oldProps, newProps) => { return oldProps.initialInfo.count == newProps.initialInfo.count });

export default InfiniteScrollMovies;