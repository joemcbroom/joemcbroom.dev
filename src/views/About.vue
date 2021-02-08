<template>
	<div class="about">
		<resume-component />
	</div>
</template>

<script>
	import ResumeComponent from '../components/ResumeComponent.vue';
	export default {
		components: { ResumeComponent },
	};
</script>

<style scoped>
	.about {
		border: 1px solid var(--Dark-Blue);
	}
</style>
