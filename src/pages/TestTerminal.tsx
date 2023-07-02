import CodeHighlightSyntax from "../components/CodeHighlightSyntax/CodeHighlightSyntax";
import Terminal from "../components/Terminal/Terminal";


const TerminalTest = () => {
  const codeBlock = `
import torch
import torch.nn as nn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model=512, num_heads=8):
        super(MultiHeadAttention, self).__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.attention = nn.MultiheadAttention(d_model, num_heads)

    def forward(self, query, key, value, mask=None):
        return self.attention(query, key, value, attn_mask=mask)

class PositionwiseFeedForward(nn.Module):
    def __init__(self, d_model=512, d_ff=2048):
        super(PositionwiseFeedForward, self).__init__()
        self.ff = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.ReLU(),
            nn.Linear(d_ff, d_model)
        )

    def forward(self, x):
        return self.ff(x)

`;

  const jsxCodeString = `\`\`\`jsx
<Terminal code={codeBlock} />
\`\`\`
  `;
  return (
    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", height: "100%", overflow: "hidden"}}>
      <div style={{
                backgroundColor: '#2C2F33',
                color: '#f6f8fa',
                padding: '1em',
                fontFamily: 'monospace',
                whiteSpace: 'pre'
            }}>
              <CodeHighlightSyntax code={jsxCodeString} parseFromMarkdown={true} />        
      </div>
      <div style={{display: "flex", alignItems: "center"}}>
      <div style={{
                width: '50px',
                height: '30px',
                backgroundColor: '#2C2F33',
            }} />
      <div style={{
                width: '0',
                height: '0',
                borderTop: '30px solid transparent',
                borderBottom: '30px solid transparent',
                borderLeft: '50px solid #2C2F33',
            }} />
      </div>
      <Terminal code={codeBlock} language={"python"}  />
    </div>
  );
};

export default TerminalTest;
