import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InfiniteScrollMovies from './nav';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Episode } from 'rickmortyapi';
import { fetchEpisodes } from './actions';


const drawerWidth = 240;

type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export default async function RootLayout(props: { children: React.ReactNode}) {

  const { results: initialEpisodes, info: info } = await React.useMemo(() => {
    return fetchEpisodes({})
  }, [1])

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppBar position="fixed">
                <Toolbar>
                  <Typography variant="h6" noWrap component="div">
                    Clipped drawer
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
              >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                  {info &&
                    <InfiniteScrollMovies initialEpisodes={initialEpisodes as Episode[]} initialInfo={info as Info} />
                  }
                </Box>
              </Drawer>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {props.children}
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
