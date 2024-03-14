import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Character } from 'rickmortyapi';

export default function CharacterList({characters}: {characters: Character[]}) {
  return (
    <ImageList sx={{ width: '100%', height: '100%' }} cols={4}>
      <ImageListItem key="Subheader" cols={4}>
        <ListSubheader component="div">Characters</ListSubheader>
      </ImageListItem>
      {characters.map((item) => (
        <ImageListItem key={item.id}>
          <img
            srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={item.species}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.name}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
