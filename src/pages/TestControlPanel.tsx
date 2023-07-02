import { useState } from "react";
import FlowControlPanel from "../components/Flow/FlowControls/FlowControlPanel";
import { Home } from "../svgs";
import { Button } from "../components/Flow/FlowControls/FlowControls";
import { Label, LabeledArea } from "../constants";
import { useTheme } from "styled-components";
import Select from "../components/Select/Select";

const SimpleButton = () => {
  const [active, setActive] = useState(false);

  const toggle = () => setActive(!active);

  return (
    <Button onClick={toggle}>
      {Home}
    </Button>
  );
};

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => setIsToggled(!isToggled);

  return (
    <Button onClick={toggle}>
      {isToggled ? "On" : "Off"}
    </Button>
  );
};

const DropdownButton = ({options = ["Option 1", "Option 2", "Option 3"]}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const theme: any = useTheme();
  return (
    <LabeledArea border={"1px solid white"} theme={theme}>
      <Label theme={theme}>{"Options"}:</Label>
      <Select value={selectedOption} onChange={setSelectedOption} options={options} />
    </LabeledArea>
  );
};

const TestControlPanel = () => {
  const buttons: any = [
    {
      component: (<SimpleButton />),
      i: "0",
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    },
    {
      component: (<ToggleButton />),
      i: "1",
      x: 1,
      y: 1,
      width: 1,
      height: 1,
    },
    {
      width: 1,
      height: 1,
      x: 2,
      y: 2,
      i: "2",
      component: (<DropdownButton options={["Red", "Green", "Blue"]} />),
    }
  ];

  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
      <div style={{display: "flex", flexDirection: "column", width: '50%', height: 'auto'}}>
        <FlowControlPanel buttons={buttons} />
      </div>
    </div>
  );
};

export default TestControlPanel;
