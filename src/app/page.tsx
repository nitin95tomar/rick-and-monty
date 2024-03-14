import * as React from 'react';
import Container from '@mui/material/Container';
import { Character, getCharacters } from 'rickmortyapi';
import CharacterList from '@/components/ImageList';

export default async function Home() {
  const characters = await getCharacters({ page: 1 })

  return (
    <Container maxWidth="lg">
      <CharacterList characters={characters.data.results as Character[]} />
    </Container>
  );
}
