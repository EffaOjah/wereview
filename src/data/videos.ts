export interface VideoReview {
    id: string;
    title: string;
    thumbnail: string;
    youtubeId: string;
    reviewer: string;
    duration: string;
    category: string;
}

export const videoReviews: VideoReview[] = [
    {
        id: 'v1',
        title: 'iPhone 15 Pro Max: One Month Later Review',
        thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800',
        youtubeId: 'W_rS_3F92q8', // Example ID
        reviewer: 'Chinedu Tech',
        duration: '12:45',
        category: 'Phones'
    },
    {
        id: 'v2',
        title: 'PS5 Slim vs Original: Which should you buy in 2024?',
        thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800',
        youtubeId: '6U43D9Q6r_A',
        reviewer: 'Lagos Gamer',
        duration: '08:30',
        category: 'Gaming'
    },
    {
        id: 'v3',
        title: 'Infinix Note 40 Pro: Wireless Charging for the Masses',
        thumbnail: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800',
        youtubeId: 'b7V98eZ_N_M',
        reviewer: 'Gadget Guru PH',
        duration: '15:20',
        category: 'Phones'
    },
    {
        id: 'v4',
        title: 'Sony WH-1000XM5: Still the ANC King?',
        thumbnail: 'https://images.unsplash.com/photo-1618366712010-8c0e2474d7c4?q=80&w=800',
        youtubeId: 'Ocvp9H6X_yA',
        reviewer: 'Amina Bello',
        duration: '10:15',
        category: 'Audio'
    }
];
