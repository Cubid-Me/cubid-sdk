import type { Meta, StoryObj } from '@storybook/react';

import { CubidWidgetCollection } from '../component/cubidWidget';

const meta = {
    title: 'Cubid/WidgetCollection',
    component: CubidWidgetCollection,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        stampToRender: [],
        uuid: "",
        page_id: "",
        api_key: "",
    },
} satisfies Meta<typeof CubidWidgetCollection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StampCollection: Story = {
    args: {
        stampToRender: ["google", 'discord', 'github'],
        uuid: "9ca584b0-dd55-441a-b72e-d06a72ff156d",
        page_id: "35",
        api_key: "653529fd-a25b-4340-ba2b-d87ded675ed1",
    },
};
