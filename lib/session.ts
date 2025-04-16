'use client';

export const getSessionFromResponse = (response: Response) =>{
    const sessionHeader = response.headers.get('user');

    if (!sessionHeader) return null;

    try {
        const session = JSON.parse(sessionHeader);

        return {
            id: session.id,
            email: session.email,
            roles: session.roles || []
        };

    } catch (error) {
        console.error('Failed to parse session header:', error);
        return null;
    }
}