<template>
	<div class="contact">
		<contact-form
			v-if="!isSending"
			@sending="isSending = true"
			@success="handleSuccess"
			@error="handleError"
		/>

		<div v-else><loading-indicator /></div>

		<search-error v-if="hasError" :error="error" />

		<div v-if="success" class="thanks">
			<img src="@/assets/img/thanks.gif" alt="thanks" />
			<span>Thanks pal!</span>
		</div>

		<div class="social-icons">
			<a href="https://github.com/jumokee"><github-icon class="icon"/></a>
			<a href="https://www.linkedin.com/in/joseph-mcbroom/"><linkedin-icon class="icon"/></a>
			<a href="mailto:contact@joemcbroom.dev"><mail-icon class="icon"/></a>
		</div>
	</div>
</template>

<script>
	import ContactForm from '../components/ContactForm';
	import { GithubIcon, LinkedinIcon, MailIcon } from 'vue-feather-icons';
	import LoadingIndicator from '../components/LoadingIndicator.vue';
	import SearchError from '../components/SearchError.vue';
	export default {
		components: { ContactForm, GithubIcon, LinkedinIcon, MailIcon, LoadingIndicator, SearchError },
		data() {
			return {
				isSending: false,
				hasError: false,
				success: false,
				error: null,
			};
		},
		methods: {
			handleSuccess() {
				debugger;
				this.isSending = false;
				this.success = true;
			},
			handleError(error) {
				this.error = error;
				this.hasError = true;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.contact {
		box-sizing: border-box;
		border: 1px solid var(--Dark-Blue);
		background-color: var(--Blue);
		padding: 20px;
		// height: 949px;
		// overflow-y: scroll;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.social-icons {
		display: flex;
		width: 50%;
		margin: auto;
		justify-content: space-between;
		.icon {
			color: white;
		}
	}
</style>
