import CodeHighlightSyntax from "../components/CodeHighlightSyntax/CodeHighlightSyntax";

export const pythonCode = `\`\`\`python
def hello():
  print("Hello World!!!!")

hello()
\`\`\``;

const TestCodeHighlight = () => {
  return (
    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", height: "100%", overflow: "hidden"}}>
      <CodeHighlightSyntax 
        code={pythonCode}
        parseFromMarkdown={true}
      />
    </div>
  )
};

export default TestCodeHighlight;

