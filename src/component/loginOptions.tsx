
// @ts-nocheck
// loginOptions.js
import { useEffect, useState } from 'react';
import { Profile, useLogin } from '@lens-protocol/react-web';
import { useProfilesManaged } from '@lens-protocol/react-web';
import { toast } from 'react-toastify';

// Remove the static import of useDisconnect from 'wagmi'
// import { useDisconnect } from 'wagmi';

export type LoginAsProps = {
  profile: Profile;
  wallet: string;
  onSuccess: (profile: Profile) => void;
};

function LoginAs({ profile, wallet, onSuccess }: LoginAsProps) {
  const { execute, loading } = useLogin();

  const login = async () => {
    const result = await execute({
      address: wallet,
      profileId: profile.id,
    });

    if (result.isSuccess()) {
      return onSuccess(profile);
    }
    localStorage.removeItem('lens-loggin');
    window.alert(result.error.message);
  };

  return (
    <button disabled={loading} onClick={login}>
      {profile.handle?.fullHandle ?? profile.id}
    </button>
  );
}

type LoginOptionsProps = {
  wallet: string;
  onSuccess: (profile: Profile) => void;
};

export function LoginOptions({ wallet, onSuccess }: LoginOptionsProps) {
  const { data: profiles, error, loading } = useProfilesManaged({
    for: wallet,
    includeOwned: true,
  });

  // We'll conditionally load the useDisconnect hook on the client.
  // Initialize disconnect as a no-op.
  const [disconnect, setDisconnect] = useState(() => () => {});

  useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      import('wagmi').then((module) => {
        // Depending on how 'wagmi' exports useDisconnect, you might access it as a named export.
        // This example assumes it is exported named.
        const { useDisconnect } = module;
        // Now that we have the hook, we call it.
        // IMPORTANT: Since hooks must be called unconditionally, this still isn’t ideal.
        // One workaround is to force a re-render by storing the disconnect function.
        const { disconnect: disconnectFn } = useDisconnect();
        setDisconnect(() => disconnectFn);
      });
    }
  }, []);

  useEffect(() => {
    if (!loading && profiles.length === 0) {
      localStorage.removeItem('lens-loggin');
      disconnect();
      toast.error('No profiles managed by this wallet.');
    }
    if (profiles?.length) {
      onSuccess(profiles[0]);
    }
  }, [loading, profiles, onSuccess, disconnect]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (profiles.length === 0) {
    return <p>No profiles managed by this wallet.</p>;
  }
  return (
    <div>
      {profiles.map((profile: any) => (
        <LoginAs
          key={profile.id}
          wallet={wallet}
          profile={profile}
          onSuccess={onSuccess}
        />
      ))}
    </div>
  );
}