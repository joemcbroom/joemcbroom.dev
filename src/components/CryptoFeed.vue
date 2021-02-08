<template>
	<div class="crypto-feed">
		<div class="ticker">
			<div class="label">BTC/USD Ticker</div>
			<span class="price" :show="btcPrice">$ {{ animatedNumber }}</span>
		</div>
	</div>
</template>

<script>
	import { gsap } from 'gsap';
	export default {
		data() {
			return {
				connection: null,
				COINBASE_WSS_URL: 'wss://ws-feed.pro.coinbase.com',
				btcPrice: 0,
				tweenedNumber: 0,
				currentTime: new Date(),
			};
		},
		computed: {
			animatedNumber() {
				return this.tweenedNumber.toFixed(2);
			},
		},
		watch: {
			btcPrice(newValue) {
				gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
			},
		},
		created() {
			this.establishWebsocket();
		},
		methods: {
			establishWebsocket() {
				let coinbaseConnection = {
					type: 'subscribe',
					product_ids: ['BTC-USD'],
					channels: [
						{
							name: 'ticker',
							product_ids: ['BTC-USD'],
						},
					],
				};
				console.log('Starting connection to WebSocket Server');
				this.connection = new WebSocket(this.COINBASE_WSS_URL);

				this.connection.onmessage = (event) => {
					let msg = JSON.parse(event.data);
					if (msg.type == 'ticker') {
						let time = new Date(msg.time);
						let timeToBeat = new Date(this.currentTime.getTime() + 5000);
						if (time > timeToBeat) {
							let price = +msg.price;
							this.btcPrice = price.toFixed(2);
							this.currentTime = time;
						}
					}
				};

				this.connection.onclose = function(event) {
					console.log('closing', event);
				};

				this.connection.onopen = (event) => {
					console.log(event);
					console.log('Successfully connected to the coinbase websocket server...');
					this.connection.send(JSON.stringify(coinbaseConnection));
				};
			},
		},
	};
</script>

<style lang="scss" scoped>
	.crypto-feed {
		width: 95%;
		border: 1px solid var(--Blue);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ticker {
		margin: 10px auto;
		.label {
			font-size: 0.7rem;
		}
		.price {
			font-size: 0.8rem;
			font-weight: bold;
		}
	}
</style>
