import 'tailwindcss/tailwind.css'
import type { Meta, StoryObj } from '@storybook/react';

import { CubidWidget } from '../component/cubidWidget';

const meta = {
    title: 'Cubid/Widget',
    component: CubidWidget,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        stampToRender: "",
        uuid: "",
        page_id: "",
        api_key: "",
    },
} satisfies Meta<typeof CubidWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GoogleWidget: Story = {
    args: {
        stampToRender: "google",
        uuid: "9ca584b0-dd55-441a-b72e-d06a72ff156d",
        page_id: "35",
        api_key: "653529fd-a25b-4340-ba2b-d87ded675ed1",
    },
};
export const DiscordWidget: Story = {
    args: {
        stampToRender: "discord",
        uuid: "9ca584b0-dd55-441a-b72e-d06a72ff156d",
        page_id: "35",
        api_key: "653529fd-a25b-4340-ba2b-d87ded675ed1",
    },
};