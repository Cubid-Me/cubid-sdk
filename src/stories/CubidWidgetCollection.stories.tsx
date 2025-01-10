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

const allStampTypes = {
    facebook: 1,
    github: 2,
    google: 3,
    twitter: 4,
    discord: 5,
    iah: 7,
    brightid: 8,
    gitcoin: 9,
    instagram: 10,
    phone: 11,
    gooddollar: 12,
    "near-wallet": 15,
    fractal: 17,
    solana: 53,
    telegram: 27,
    worldcoin: 26,
    near: 15,
    "lens-protocol": 66,
    farcaster: 68,
    address: 70
}

export const StampCollection: Story = {
    args: {
        stampToRender: Object.keys(allStampTypes),
        uuid: "158c64cf-7418-4fb2-b36e-068029c3c486",
        page_id: "35",
        api_key: "653529fd-a25b-4340-ba2b-d87ded675ed1",
    },
};
