// file: CubidBlacklist.stories.tsx

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// We pull in these styles to match your example, though
// you could remove them if they're not needed:
import 'react-phone-input-2/lib/style.css';
import '@farcaster/auth-kit/styles.css';
import { Provider } from '../component/providers'
import { VerificationModal } from '../component/blackListing';

/**
 * Storybook: Combining everything
 * -------------------------------
 * We wrap VerificationModal in Provider (PropsWithComp),
 * then define three stories (Email, Phone, Wallet).
 */

const PropsWithComp = (props: any) => {
    return (
        <Provider>
            <VerificationModal duplicateInfo={{ maskedEmail: "asas@gmail.com", maskedAddress: "0x712913366F98aa0A5E77EfddA05BaC65C52ae9bD", maskedPhone: "+918146851290" }} {...props} />
        </Provider>
    );
};

const meta = {
    title: 'Cubid/Blacklist',
    component: PropsWithComp,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof VerificationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Email Story
 */
export const Email: Story = {
    args: {
        type: 'email',
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div style={{ padding: 20 }}>
                <button onClick={() => setIsOpen(true)}>Open Email Modal</button>

                <PropsWithComp
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    realInfo={{
                        email: "harjaapdhillon.hrizn@gmail.com"
                    }}
                />
            </div>
        );
    },
};

/**
 * Phone Story
 */
export const Phone: Story = {
    args: {
        type: 'phone',
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div style={{ padding: 20 }}>
                <button onClick={() => setIsOpen(true)}>Open Phone Modal</button>

                <PropsWithComp
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    realInfo={{
                        phone: "+918146851290"
                    }}
                />
            </div>
        );
    },
};

/**
 * Wallet Story
 */
export const Wallet: Story = {
    args: {
        type: 'wallet',
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div style={{ padding: 20 }}>
                <button onClick={() => setIsOpen(true)}>Open Wallet Modal</button>

                <PropsWithComp
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    realInfo={{
                        phone: "0x712913366F98aa0A5E77EfddA05BaC65C52ae9bD"
                    }}
                />
            </div>
        );
    },
};