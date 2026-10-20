export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" escapado para nenhum texto fechar a tag script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
