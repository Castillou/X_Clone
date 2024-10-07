import {
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import Tweet from './tweet';
import { Unsubscribe } from 'firebase/auth';

export interface ITweet {
	id: string;
	photo?: string;
	tweet: string;
	userId: string;
	username: string;
	createAt: number;
}

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: 50vh;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0;
	}
`;

export default function Timeline() {
	const [tweets, setTweet] = useState<ITweet[]>([]);

	useEffect(() => {
		let unsubscribe: Unsubscribe | null = null;
		const fetchTweets = async () => {
			const tweetsQuery = query(
				collection(db, 'tweets'),
				orderBy('createdAt', 'desc'), // createAt을 기준으로 내림차순 정렬
				limit(25)
			);
			/* const snapshot = await getDocs(tweetsQuery);
      const tweets = snapshot.docs.map((doc) => {
        const { tweet, createdAt, userId, username, photo } = doc.data();
        return {
          tweet,
          createdAt,
          userId,
          username,
          photo,
          id: doc.id,
        };
      }); */
			unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
				const tweets = snapshot.docs.map((doc) => {
					const { tweet, createdAt, userId, username, photo } = doc.data();
					return {
						tweet,
						createdAt,
						userId,
						username,
						photo,
						id: doc.id,
					};
				});
				setTweet(tweets);
			});
		};
		fetchTweets();
		return () => {
			unsubscribe && unsubscribe();
		};
	}, []);

	return (
		<Wrapper>
			{tweets.map((tweet) => (
				<Tweet key={tweet.id} {...tweet} />
			))}
		</Wrapper>
	);
}
