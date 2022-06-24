import io from 'socket.io-client';

// When test on local
export const socket = io('http://127.0.0.1:9000', { autoConnect: false });
// export const socket = io('/', { autoConnect: false });
