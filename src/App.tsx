import React, { useCallback, useEffect, useState } from 'react';

interface JsonResource {
  '@id': string;
  '@type': string;
  '@description': string;
}

interface PeopleResource extends JsonResource {
  '@type': 'People';
  name: string;
  films: string[];
}

interface FilmResource extends JsonResource {
  '@type': 'Film';
  title: string;
}

type Resource = PeopleResource | FilmResource;

type HTMLAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function Link(props: Omit<HTMLAnchorProps, 'href'>) {
  return (
    // eslint-disable-next-line
    <a
      {...props}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        props.onClick?.(event);
      }}
    />
  );
}

function App() {
  const [currentResource, setCurrentResource] = useState<Resource>();
  const loadResource = useCallback(async (url: string) => {
    const [, collection] = url.match(/\/\/swapi\.dev\/api\/(\w+)\//) ?? [];
    const [{ url: resourceUrl, ...resource }, schema] = await Promise.all([
      fetch(url).then((response) => response.json()),
      fetch(`https://swapi.dev/api/${collection}/schema`).then((response) =>
        response.json(),
      ),
    ]);

    setCurrentResource({
      ...resource,
      '@id': resourceUrl,
      '@type': schema.title,
      '@description': schema.description,
    });
  }, []);
  useEffect(() => {
    loadResource('https://swapi.dev/api/people/1/');
  }, [loadResource]);

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 10 }}>
      <h1>This is Star Wars!</h1>
      {currentResource === undefined && <h5>Loading...</h5>}
      {currentResource?.['@type'] === 'People' && (
        <section>
          <p>Name: {currentResource.name}</p>
          <ul>
            {currentResource.films.map((filmUrl) => (
              <li key={filmUrl}>
                <Link onClick={() => loadResource(filmUrl)}>{filmUrl}</Link>
              </li>
            ))}
          </ul>
          <h6>{currentResource['@description']}</h6>
        </section>
      )}
      {currentResource?.['@type'] === 'Film' && (
        <section>
          <p>Name: {currentResource.title}</p>
          <h6>{currentResource['@description']}</h6>
        </section>
      )}
    </main>
  );
}

export default App;
