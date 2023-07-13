import { Accordion } from "../components/Accordion/Accordion";
import FlowControlPanel from "../components/Flow/FlowControls/FlowControlPanel";
import Panel from "../components/Panel/Panel";
import Select from "../components/Select/Select";

const buttons = [
  {
    component: (props: any) => <Select options={['wow', 'crazy']} value={'wow'} onChange={() => {}} />,
    x: 0,
    y: 0,
    w: 2,
    h: 2,
  }
]
const Test = () => {
    return (
      <div style={{width: '100%', height: '100%', display: 'flex'}}>
      <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", gap: '20px', flexWrap: 'wrap', overflow: 'hidden', padding: '20px'}}>
      <div style={{display: "flex", width: '100%', height: '200px'}}>
        <Panel  panelPosition='left'>
        <Accordion>
        <FlowControlPanel buttons={buttons} />
        </Accordion>
        </Panel>
        </div>
        </div>
        </div>
    );
};

export default Test;