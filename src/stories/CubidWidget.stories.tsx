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
        uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8",
    },
};
export const DiscordWidget: Story = {
    args: {
        stampToRender: "discord",
        uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8",
    },
};

export const AddressWidget: Story = {
    args: {
        stampToRender: "address",
        uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8",
    },
};

export const PhoneWidget: Story = {
    args: {
        stampToRender: "phone",
        uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8",
    },
};