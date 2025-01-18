import type { StoryObj } from '@storybook/react';
import 'react-phone-input-2/lib/style.css';
import '@farcaster/auth-kit/styles.css';
declare const meta: {
    title: string;
    component: (props: any) => any;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        stampToRender: string;
        uuid: string;
        page_id: string;
        api_key: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const GoogleWidget: Story;
export declare const DiscordWidget: Story;
export declare const AddressWidget: Story;
export declare const PhoneWidget: Story;
