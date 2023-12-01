import { gql } from "@apollo/client";

export const UpsertUserQuery = gql`
    mutation UpsertUser($firstName: String!, $lastName: String!, $personalEmail: String!, $bio: String!, $profilePicture: String, $email: String, $phone: String, $website: String, $linkedin: String) {
        upsertUser(
            input: {
                firstName: $firstName
                lastName: $lastName
                email: $personalEmail
                bio: $bio
                profilePicture: $profilePicture
                profile: { email: $email, phone: $phone, website: $website, linkedin: $linkedin }
            }
        ) {
            id
        }
    }
`;

export const ConnectByEmailQuery = gql`
    mutation ConnectByEmail($inviteId: ID!, $email: String!, $subscribe: Boolean!) {
        connectByEmail(inviteId: $inviteId, email: $email, subscribe: $subscribe) {
            id
        }
    }
`;

export const DeleteConnectionQuery = gql`
    mutation DeleteConnection($id: ID!) {
        deleteCustomConnection(id: $id) {
            id
        }
    }
`;

export const UpsertConnectionQuery = gql`
    mutation UpsertConnection($id: ID, $firstName: String, $lastName: String, $email: String, $phone: String, $website: String, $linkedin: String, $notes: String) {
        upsertCustomConnection(id: $id, customConnection: { firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, website: $website, linkedin: $linkedin, notes: $notes }) {
            id
            email
            firstName
            lastName
            notes
            phone
            website
            linkedin
        }
    }
`;

export interface CreateInviteType {
    createInvite: {
        id: string;
        userId: string;
        expiresAt: number;
        publicProfile: {
            firstName: string;
            lastName: string;
        };
    };
}

export const CreateInviteQuery = gql`
    mutation CreateInvite {
        createInvite {
            id
            userId
            expiresAt
            publicProfile {
                firstName
                lastName
            }
        }
    }
`;
