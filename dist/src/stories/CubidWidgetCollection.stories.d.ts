import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: (props: any) => any;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        stampToRender: any[];
        uuid: string;
        page_id: string;
        api_key: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const StampCollection: Story;
