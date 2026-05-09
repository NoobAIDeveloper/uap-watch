// Single-purpose JSON-LD injector. Server component — renders a <script
// type="application/ld+json"> tag with stringified schema. Used by every
// programmatic page so AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
// can extract structured facts without parsing the visual layout.
//
// Pass an object or an array of objects; arrays render one tag per entry so
// each schema is parsed independently by validators.

type Json = Record<string, unknown>;

export default function JsonLd({ data }: { data: Json | Json[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
