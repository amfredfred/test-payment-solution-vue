export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};


export type Profile = {
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    interests: string;
    username: string;
    profilePics: string;
    coverPics: string;
    age: number;
    gender: string;
    role: string;
    emailVerifiedAt: Date | null; // Assuming email_verified_at is a nullable date
}

export type AuthResponse = {
    profile?: Profile,
    token?: string,
    message?: String
}

export type Wallet = {
    balance: number, slug: string, name: string, transsaction_count: number
}

export type DashResponse = {
    wallets: Wallet[];
    pay_link: string
}

export type WalletCreateDataResponse = {
    currencies: { name: string, slug: string }[]
}

export type WalletCreatedResponse = {
    message: string,
    error: string
}


export type TransferCreateDataRresponse = {
    wallets: Wallet[];
    users: Profile[]
    recipient_id: number
}

export type TransferCreatedResponse = {
    message: string,
    error: string
}