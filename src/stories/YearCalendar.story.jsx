import YearCalendar from "../components/YearCalendar";

export default {
  title: "Components/YearCalendar",
  component: YearCalendar,
  argTypes: {},
};

const Template = (args) => <YearCalendar {...args} />;

export const YearCalendar = Template.bind({});
