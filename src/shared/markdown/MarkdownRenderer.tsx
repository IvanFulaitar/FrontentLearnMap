import styles from "./MarkdownRenderer.module.css";

const highlight = (code: string) =>
  code
    .replace(/(const|let|function|return|type|interface|export|import|from)/g, '<span class="keyword">$1</span>')
    .replace(/("[^"]*"|'[^']*')/g, '<span class="string">$1</span>');

export function MarkdownRenderer({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/);
  return (
    <div className={styles.markdown}>
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) return <h3 key={index}>{block.replace("### ", "")}</h3>;
        if (block.startsWith("## ")) return <h2 key={index}>{block.replace("## ", "")}</h2>;
        if (block.startsWith("# ")) return <h1 key={index}>{block.replace("# ", "")}</h1>;
        if (block.startsWith("```")) {
          const code = block.replace(/```[a-z]*\n?/, "").replace(/```$/, "");
          return <pre className={styles.codeBlock} key={index}><code dangerouslySetInnerHTML={{ __html: highlight(code) }} /></pre>;
        }
        if (block.startsWith("- ")) {
          return <ul key={index}>{block.split("\n").map((item) => <li key={item}>{item.replace("- ", "")}</li>)}</ul>;
        }
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}
