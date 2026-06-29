import { useEffect, useState } from 'react';


export const useIsClient = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line @eslint-react/set-state-in-effect
        setIsClient(true);
    }, []);

    return isClient;
};
