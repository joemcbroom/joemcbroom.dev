<template>
	<div id="searchError">{{ error }}</div>
</template>
<script>
	export default {
		props: {
			error: {
				type: String,
				default: '',
			},
		},
	};
</script>
<style lang="scss">
	#searchError {
		display: inline-block;
		position: relative;
		height: 80px;
		margin: 20px 0;
	}
</style>
