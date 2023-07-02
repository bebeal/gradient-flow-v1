import FlowTabs from "../components/Tabs/Tabs";
import { Home } from "../svgs";

const TestTabs = () => {
  const tabs = [
    {
      key: 'home',
      label: 'Home',
      icon: Home,
      content: <div>Home content...</div>
    },
    {
      key: 'settings',
      label: 'Settings',
      content: <div>Settings content...</div>
    },
    {
      key: 'profile',
      label: 'Profile',
      content: <div>Profile content...</div>
    }
  ];

  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
      <div style={{display: "flex", flexDirection: "column", height: "50%", justifyContent: "center", alignItems: "center"}}>
      <FlowTabs tabs={tabs} initialTab={0} />
      </div>
    </div>
  );
};

export default TestTabs;
