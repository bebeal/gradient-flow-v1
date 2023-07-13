import LabeledAttributes from "../components/LabeledAttribute/LabeledAttribute";

const TestLabeledAttributes = () => {
  const simpleNode = {
    "node-1": {
      id: `node-1`,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    }
  };

  const complexObj = {
    "node-1": {
      id: `node-1`,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      data: {
        language: 'Python'
      }
    },
    "node-2": {
      id: `node-2`,
      width: 100,
      height: 100,
      x: 0,
      y: 1,
      data: {
        language: 'Python',
        wow: {
          such: {
            crazy: {
              'wow': 'sdfaffsdfsdfasfdsafasdfsdafsdfdsfdsfsdfdsfefewfkjfjogrjiogrjiogrijogrigijgfjgfjoifgjfgjfgjigjifgjingdjinsjnsongslgjnidrhjdogjdiojisdfaffsdfsdfasfdsafasdfsdafsdfdsfdsfsdfdsfefewfkjfjogrjiogrjiogrijogrigijgfjgfjoifgjfgjfgjigjifgjingdjinsjnsongslgjnidrhjdogjdioji'
            }
          }
        }
      }
    }
  };
  return (
    <>
      <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "column", width: '75%', height: '50%', overflow: 'auto'}}>
          <LabeledAttributes layout={"row"}>
            {simpleNode}
          </LabeledAttributes>
          <LabeledAttributes layout={"column"}>
            {simpleNode}
          </LabeledAttributes>
          <LabeledAttributes layout={"row"}>
            {complexObj}
          </LabeledAttributes>
          <LabeledAttributes layout={"column"}>
            {complexObj}
          </LabeledAttributes>
        </div>
      </div>
    </>
  )
};

export default TestLabeledAttributes;
