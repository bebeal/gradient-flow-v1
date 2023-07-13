import { useState } from "react";
import FlowControlPanel from "../components/Flow/FlowControls/FlowControlPanel";
import { ClickableButton, LabeledInput, LabeledSelector, ToggleButton } from "../components/Flow/FlowControls/FlowButtons";
import { Home, Pencil } from "../svgs";

const DropdownButton = ({options = ["Option 1", "Option 2", "Option 3"]}: any) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const setOption = (option: any) => {
    setSelectedOption(option);
  };
  return <LabeledSelector label={"Dropdown"} value={selectedOption} onChange={setOption} options={options} />
};

const TestControlPanel = () => {
  const [toggleButtonState, setToggleButtonState] = useState(true);
  const toggleButtonClicked = () => {
    setToggleButtonState(!toggleButtonState);
  };

  const [toggleMode, setToggleMode] = useState(true);
  const toggleToggleMode = () => {
    setToggleMode(!toggleMode);
  };


  const [value, setValue] = useState<any>(0);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  const buttons: any = [
    {
      component: (props: any) => <LabeledInput {...props} label={"input"} value={value} onChange={onChange}  />,
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    },
    {
      component: (props: any) => <ToggleButton {...props} onClick={toggleButtonClicked} active={toggleButtonState} activeValue={'on'} defaultValue={'off'} />,
      x: 1,
      y: 1,
      width: 1,
      height: 1,
    },
    {
      width: 2,
      height: 2,
      x: 2,
      y: 2,
      component: (props: any) => <DropdownButton {...props}  />
    },
    {
      width: 1,
      height: 1,
      x: 3,
      y: 3,
      component: (props: any) => <ToggleButton {...props} onClick={toggleToggleMode} active={toggleMode} defaultValue={Home} />,
    },
    {
      component: (props: any) => (
        <ClickableButton onClick={() => {}}>
                  <>React<br />Flow</>
                </ClickableButton>
      ),
      x: 4,
      y: 4,
    }
  ];

  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
      <div style={{display: "flex", flexDirection: "column", width: '50%', height: '50%'}}>
        <FlowControlPanel buttons={buttons} />
      </div>
    </div>
  );
};

export default TestControlPanel;
