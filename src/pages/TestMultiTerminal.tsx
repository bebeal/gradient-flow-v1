import CodeHighlightSyntax from "../components/CodeHighlightSyntax/CodeHighlightSyntax";
import MultiTerminal from "../components/Terminal/MultiTerminal";
import Terminal from "../components/Terminal/Terminal";


const MultiTerminalTest = () => {
  const codeBlock0 = `
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

`;

const codeBlock1 = `
\`\`\`python
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
\`\`\`
`;

const codeBlock2 = `
\`\`\`python
class EncoderLayer(nn.Module):
    def __init__(self, d_model=512, num_heads=8, d_ff=2048, dropout=0.1):
        super(EncoderLayer, self).__init__()
        self.attention = MultiHeadAttention(d_model, num_heads)
        self.norm1 = nn.LayerNorm(d_model)
        self.dropout1 = nn.Dropout(dropout)
        self.ff = PositionwiseFeedForward(d_model, d_ff)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout2 = nn.Dropout(dropout)
          
    def forward(self, x, mask=None):
        x2 = self.attention(x, x, x, mask=mask)[0]
        x = x + self.dropout1(x2)
        x2 = self.ff(self.norm1(x))
        x = x + self.dropout2(x2)
        return self.norm2(x)
\`\`\`
`;

  const jsxCodeString = `\`\`\`jsx
<MultiTerminal terminals={[
  {title: 'node0', code: codeBlock0},
  {title: 'node1', code: codeBlock1, parseFromMarkdown: true},
  {title: 'node2', code: codeBlock2}
]}  />
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
      <MultiTerminal terminals={[
        {title: 'node0', code: codeBlock0},
        {title: 'node1', code: codeBlock1, parseFromMarkdown: true},
        {title: 'node2', code: codeBlock2}
      ]}  />
    </div>
  );
};

export default MultiTerminalTest;
