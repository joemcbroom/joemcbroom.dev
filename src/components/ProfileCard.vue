<template>
	<div class="flip-container">
		<div class="flipper">
			<div class="card front">
				<div class="top-card">
					<img
						:src="`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`"
						alt=""
						hidden
						@load="imageLoad()"
					/>
					<div
						v-if="imageLoaded"
						class="image"
						:style="{
							backgroundImage: `url(https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png)`,
						}"
					></div>
					<loading-indicator v-else class="loading-indicator" />
					<div>{{ person.name }}</div>
				</div>
			</div>

			<div class="card back">
				<h3>{{ person.name }}</h3>
				<div class="profile-content">
					<p class="title"><strong>Company:</strong> {{ person.company.name }}</p>
					<p>{{ person.company.address }} St.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import LoadingIndicator from './LoadingIndicator.vue';
	export default {
		components: { LoadingIndicator },
		props: {
			person: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				imageLoaded: false,
			};
		},
		methods: {
			imageLoad() {
				let _this = this;
				setTimeout(() => {
					_this.imageLoaded = true;
				}, Math.floor(Math.random() * 10));
			},
		},
	};
</script>

<style scoped>
	.top-card {
		background: linear-gradient(to top, #e8e8e8, #fafafa);
		padding: 20px;
		border-radius: 15px 15px 0px 0px;
	}
	.image {
		display: inline-block;
		background-repeat: no-repeat;
		border-radius: 50%;
		background-size: cover;
		border: 1px solid #333;
		height: 165px;
		width: 150px;
		background-position: center;
	}
	.loading-indicator {
		height: 165px;
		width: 150px;
		border: 1px solid #333;
		border-radius: 50%;
		margin: auto;
	}
	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		max-width: 300px;
		margin: auto;
		text-align: center;
		border-radius: 15px;
	}

	.title {
		color: grey;
		font-size: 14px;
	}

	h3 {
		margin-bottom: 0;
	}
	.profile-content {
		min-height: 100px;
		border-top: 2px solid grey;
	}
	.profile-content p {
		text-align: justify;
		padding: 0px 15px 10px 15px;
	}
	.profile-contact {
		color: grey;
		font-size: 14px;
		position: absolute;
		right: 5px;
		bottom: 1px;
		margin: 0;
	}
	.profile-contact:hover {
		color: grey;
		font-size: 14px;
		cursor: pointer;
	}

	/* flipper */

	.flip-container {
		perspective: 1000px;
		margin: 0 auto;
		padding-top: 20px;
		cursor: pointer;
	}
	/* flip the pane when hovered */
	.flip-container:hover .flipper,
	.flip-container.hover .flipper {
		transform: rotateY(180deg);
	}

	.flip-container,
	.front,
	.back {
		width: 100%;
		min-height: 225px;
	}

	/* flip speed goes here */
	.flipper {
		transition: 0.6s;
		transform-style: preserve-3d;
		position: relative;
	}

	/* hide back of pane during swap */
	.front,
	.back {
		backface-visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}

	/* front pane, placed above back */
	.front {
		z-index: 2;
		/* for firefox 31 */
		transform: rotateY(0deg);
	}

	/* back, initially hidden pane */
	.back {
		transform: rotateY(180deg);
	}

	.lower-section {
		/* position: absolute; */
		bottom: 10px;
		height: 40px;
		border-top: 2px solid #333;
		padding-top: 5px;

		margin: 0 auto;
	}
</style>
