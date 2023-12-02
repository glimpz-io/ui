import { gql } from "@apollo/client";

export interface GetUserType {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        bio: string;
        profilePicture: string | null;
        profile: {
            email: string | null;
            phone: string | null;
            website: string | null;
            linkedin: string | null;
        };
    };
}

export const GetUserQuery = gql`
    query GetUser {
        user {
            id
            firstName
            lastName
            email
            bio
            profilePicture
            profile {
                email
                phone
                website
                linkedin
            }
        }
    }
`;

export interface GetInviteQueryType {
    invite: {
        id: string;
        userId: string;
        expiresAt: number;
        publicProfile: {
            firstName: string;
            lastName: string;
            bio: string;
            profilePicture: string | null;
            profile: {
                email: string | null;
                phone: string | null;
                website: string | null;
                linkedin: string | null;
            };
        };
    };
}

export const GetInviteQuery = gql`
    query GetInvite($id: ID!) {
        invite(id: $id) {
            id
            userId
            expiresAt
            publicProfile {
                firstName
                lastName
                bio
                profilePicture
                profile {
                    email
                    phone
                    website
                    linkedin
                }
            }
        }
    }
`;

export interface GetCustomConnectionType {
    customConnection: {
        id: string;
        userId: string;
        connectedAt: number;
        firstName: string | null;
        lastName: string | null;
        notes: string | null;
        email: string | null;
        phone: string | null;
        website: string | null;
        linkedin: string | null;
    };
}

export const GetCustomConnectionQuery = gql`
    query GetCustomConnection($id: ID!) {
        customConnection(id: $id) {
            id
            userId
            email
            firstName
            lastName
            notes
            email
            phone
            website
            linkedin
        }
    }
`;

export interface GetCustomConnectionsType {
    customConnections: {
        id: string;
        userId: string;
        connectedAt: number;
        firstName: string | null;
        lastName: string | null;
        notes: string | null;
        email: string | null;
        phone: string | null;
        website: string | null;
        linkedin: string | null;
    }[];
}

export const GetCustomConnectionsQuery = gql`
    query GetCustomConnections {
        customConnections {
            id
            userId
            connectedAt
            firstName
            lastName
            notes
            email
            phone
            website
            linkedin
        }
    }
`;

export interface GetUploadType {
    upload: {
        uploadUrl: string;
        publicUrl: string;
    };
}

export const GetUploadQuery = gql`
    query Upload {
        upload {
            uploadUrl
            publicUrl
        }
    }
`;
