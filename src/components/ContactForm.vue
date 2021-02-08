<template>
	<form class="contact-form" @submit.prevent="sendEmail">
		<h2>Get In Touch</h2>
		<div class="form-group">
			<input placeholder="Your Name" class="user-name" type="text" name="user_name" required />
			<input placeholder="Your Email" type="email" name="user_email" />
		</div>
		<textarea rows="2" placeholder="Your Message" name="message"></textarea>
		<input class="submit" type="submit" value="Send" />
	</form>
</template>

<script>
	import emailjs from 'emailjs-com';

	export default {
		data() {
			return {
				EMAIL_ID: process.env.VUE_APP_EMAIL_ID,
				EMAIL_USER_ID: process.env.VUE_APP_EMAIL_USER_ID,
				TEMPLATE_ID: 'contact_form',
			};
		},
		methods: {
			sendEmail(e) {
				this.$emit('sending');
				emailjs.sendForm(this.EMAIL_ID, this.TEMPLATE_ID, e.target, this.EMAIL_USER_ID).then(
					(_) => this.$emit('success'),
					(error) => this.$emit('error', error)
				);
			},
		},
	};
</script>

<style lang="scss" scoped>
	form {
		color: white;
		width: 80%;
		margin: auto;

		input,
		textarea {
			background-color: var(--Blue);
			border: none;
			border-bottom: 1px solid white;
			outline: none;
			width: 88%;
			&::placeholder {
				color: white;
				font-family: 'Proza Libre', sans-serif;
				font-size: 1.2rem;
				line-height: 1.2rem;
				padding-left: 8px;
				// text-align: center;
			}
			&.submit {
				color: white;
				width: 100px;
				border: 1px solid white;
				padding: 0.8em 1em;
				margin-top: 40px;
			}
		}
		.form-group input {
			margin: 2em 4%;
			line-height: 2;
			width: 40%;
		}
		label {
			display: block;
			color: white;
		}
	}
	@media screen and (max-width: 700px) {
		form {
			width: 100%;
		}
	}
</style>
