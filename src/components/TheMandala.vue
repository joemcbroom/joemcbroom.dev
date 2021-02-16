<template>
	<div id="wrap">
		<div id="mandala" :class="{ rotate: rotateMandala }">
			<div
				v-for="(item, i) in ([].length = 12)"
				:id="i"
				:key="`item-${i}`"
				:style="{ transform: 'rotate(' + i * 30 + 'deg)' }"
				class="circle hidden"
			></div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				rotateMandala: false,
			};
		},
		async mounted() {
			for (let i = 0; i <= 11; i++) {
				await this.delay();
				document.getElementById(i).classList.remove('hidden');
				if (i == 11) {
					this.rotateMandala = true;
					this.recursiveFillPetals();
				}
			}
		},
		methods: {
			delay: async (ms) => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(true);
					}, ms || 100);
				});
			},
			async recursiveFillPetals() {
				for (let i = 0; i <= 11; i++) {
					await this.delay(50);
					Array.from(document.querySelectorAll('.circle')).forEach((el) =>
						el.classList.remove('fill')
					);
					document.getElementById(i).classList.add('fill');
					if (i == 11) {
						this.recursiveFillPetals();
					}
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.hidden {
		display: none;
	}
	#wrap {
		width: 750px;
		height: 750px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#mandala {
		width: 500px;
		height: 500px;
		position: relative;
		&.rotate {
			animation: rotation 30s infinite linear;
		}
		.circle {
			width: 50%;
			height: 50%;
			border-radius: 50%;
			border: 1px solid var(--Dark-Blue);
			position: absolute;
			transform-origin: bottom right;
			&.fill {
				&:nth-of-type(even) {
					&:after {
						background: var(--Blue);
					}
				}
				&:nth-of-type(odd) {
					&:after {
						background: var(--Dark-Blue);
					}
				}
			}
			&:nth-of-type(even) {
				border: 2px solid var(--Blue);
				&:after {
					content: '';
					width: 200px;
					height: 200px;
					border: 2px solid var(--Dark-Blue);
					position: absolute;
					left: 50%;
					top: -50%;
					transform: translateX(-66.66%) rotate(13deg);
					border-radius: 0% 50% 50% 50%;
					background: transparent;
					transition: background 100ms;
				}
			}
			&:nth-of-type(odd) {
				&:after {
					content: '';
					width: 200px;
					height: 200px;
					border: 1px solid var(--Blue);
					position: absolute;
					left: 50%;
					top: -50%;
					transform: translateX(-66.66%) rotate(13deg);
					border-radius: 0% 50% 50% 50%;
					background: transparent;
					transition: background 100ms;
				}
			}
		}
	}
	@keyframes rotation {
		from {
			transform: rotate(359deg);
		}
		to {
			transform: rotate(0deg);
		}
	}
</style>
