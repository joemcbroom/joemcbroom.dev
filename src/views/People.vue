<template>
	<div class="people">
		<h2>People App</h2>
		<div class="page-description">
			Vue app with Express.js server hosted on Google Cloud Platform.
			<a target="_blank" href="https://github.com/jumokee/graphql-express-server">
				View Server Code on Github
			</a>
			<br />The server uses GraphQL to build query schemas - Data is loaded from a mock API service.
			<br />
			(Hint: Hover Cards)
		</div>
		<figure v-for="person in people" :key="person.id">
			<profile-card :person="person" />
		</figure>
	</div>
</template>

<script>
	import ProfileCard from '@/components/ProfileCard';
	export default {
		components: { ProfileCard },
		data() {
			return {
				people: [],
				GRAPHQL_API_URL: process.env.VUE_APP_GRAPHQL_SERVER_URL,
			};
		},
		mounted() {
			this.getPeople();
		},
		methods: {
			getPeople() {
				console.log(process.env.NODE_ENV);
				let query = {
					query: `{ 
								people {
                                	name
                                	avatar
                                	id
                                	company {
                                    	name
                                    	address
                                	}
                            	}
                            }
                        `,
				};
				fetch(this.GRAPHQL_API_URL, {
					method: 'POST',
					body: JSON.stringify(query),
					headers: Object.assign({
						Accept: 'application/json',
						'Content-Type': 'application/json',
					}),
				})
					.then((res) => res.json())
					.then((json) => (this.people = json.data.people));
			},
		},
	};
</script>

<style>
	.people {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	figure {
		width: 30%;
		margin: 0;
	}
	@media screen and (max-width: 900px) {
		figure {
			width: 45%;
		}
	}
	@media screen and (max-width: 700px) {
		figure {
			width: 100%;
		}
	}
</style>
