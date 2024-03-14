import * as React from 'react';
import Container from '@mui/material/Container';
import { fetchCharacters } from './actions';
import CharacterList from '@/components/ImageList';

const About = async ({ params }: { params: { episodeId: number } }) => {
  const characters = await fetchCharacters({ id: params.episodeId })

  return (
    <Container maxWidth="lg">
      <CharacterList characters={characters} />
    </Container>
  );
}

export default About;
