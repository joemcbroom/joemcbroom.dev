<template>
	<div class="movie-card" :class="{ 'has-details': showDetails }">
		<img
			v-show="isLoaded"
			:src="poster"
			:alt="`Poster for ${title}`"
			class="hide-details"
			@load="loaded"
		/>
		<loading-indicator v-if="!isLoaded" />
		<span class="title hide-details">{{ title }}</span>
		<span class="year hide-details">{{ year }}</span>
		<div class="show-more hide-details" @click.prevent="getDetails">More</div>
		<movie-details v-if="showDetails" :details="details" @close="hideDetails" />
	</div>
</template>

<script>
	import LoadingIndicator from './LoadingIndicator.vue';
	import MovieDetails from './MovieDetails.vue';
	export default {
		components: { LoadingIndicator, MovieDetails },
		props: {
			// eslint-disable-next-line vue/require-default-prop
			movie: {
				type: Object,
			},
		},
		data() {
			return {
				OMDB_API_URL: `https://www.omdbapi.com/?apikey=${process.env.VUE_APP_API_KEY}&`,
				title: this.movie.Title,
				year: this.movie.Year,
				poster: this.movie.Poster,
				id: this.movie.imdbID,
				isLoaded: false,
				showDetails: false,
				details: {},
			};
		},
		methods: {
			loaded() {
				let _this = this;
				setTimeout(function() {
					_this.isLoaded = true;
				}, Math.floor(Math.random() * 900) + 100);
			},
			getDetails() {
				fetch(this.OMDB_API_URL + 'i=' + this.id)
					.then((res) => {
						return res.json();
					})
					.then((movie) => {
						this.details = movie;
						this.showDetails = true;
						this.$emit('moveToFront');
					});
			},
			hideDetails() {
				this.showDetails = false;
				this.$emit('hideDetails');
			},
		},
	};
</script>

<style lang="scss">
	.movie-card {
		width: 145px;
		min-height: 175px;
		border: 1px solid var(--Blue);
		box-shadow: 1px 1px 2px var(--Dark-Blue);
		margin: 0 2px 10px;
		padding: 5px 0;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		transition: box-shadow 0.8s ease-in-out, transform 0.8s ease-in-out;
		&:hover {
			box-shadow: 2px 2px 4px var(--Dark-Blue);
			transform: scale(1.1);
		}
		img {
			width: 80px;
			height: 120px;
			object-fit: cover;
		}
		span {
			font-size: 0.6rem;
			display: block;
		}
		.title {
			font-weight: bold;
			padding: 0px 8px;
		}
		.show-more {
			cursor: pointer;
			color: var(--Blue);
			font-weight: bold;
			font-size: 0.65rem;
		}
		&.has-details {
			width: 100%;
			height: 200px;
			overflow: hidden;
			&:hover {
				transform: none;
				box-shadow: none;
			}
			.hide-details {
				display: none;
			}
		}
	}
	@media screen and (max-width: 700px) {
		.movie-card {
			width: 130px;
			min-height: 200px;
		}
	}
</style>
