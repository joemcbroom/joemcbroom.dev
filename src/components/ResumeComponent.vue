<template>
	<div class="resume">
		<div class="header">
			<div class="contact-section text-right">
				<div class="location">{{ me.location }}</div>
				<div class="phone">{{ me.phone }}</div>
			</div>
			<div class="image-section">
				<img
					class="profile-img"
					src="@/assets/img/profile-1.jpg"
					alt="Image of the site's Author"
				/>
			</div>
			<div class="links-section text-left">
				<div class="email">
					<a :href="`mailto:${me.email}`">Email <mail-icon class="pr-2" /> </a>
				</div>
				<div class="links">
					<div v-for="{ name, href } of me.links" :key="name" class="link">
						<a :href="`http://${href}`">
							{{ name }}
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="objective text-left">
			<h4 class="highlight">📝 Summary</h4>
			<span>{{ me.objective }}</span>
		</div>
		<div class="skills text-left">
			<h4 class="highlight">🎒 Skills</h4>
			<div v-for="cat of Object.keys(me.skills)" :key="cat">
				<h5 class="skill-category">{{ cat }}</h5>
				<span v-for="(skill, i) of me.skills[cat]" :key="skill" class="skill">
					{{ skill }}<span v-if="i != me.skills[cat].length - 1" class="skill-comma">, </span>
				</span>
			</div>
		</div>
		<div class="bottom">
			<div class="experience text-left">
				<h4 class="highlight">👨‍💻 Experience</h4>
				<div v-for="item of me.experience" :key="item.name" class="experience-item">
					<span class="left">
						<strong>{{ item.name }}</strong>
					</span>
					<span class="right">{{ item.startDate }} - {{ item.endDate }}</span>
					<br />
					<div class="title">
						<em>{{ item.title }}</em>
					</div>
					<ul>
						<li v-for="detail of item.details" :key="detail" class="detail">
							{{ detail }}
						</li>
					</ul>
				</div>
			</div>
			<div class="education text-left">
				<h4 class="highlight">📚 Education</h4>
				<div v-for="item of me.education" :key="item.name" class="education-item">
					<span class="left">
						<strong>{{ item.name }}</strong>
					</span>
					<span class="right">{{ item.startDate }} - {{ item.endDate }}</span>
					<br />
					<div class="title">
						<em>{{ item.title }}</em>
					</div>
					<ul>
						<li v-for="detail of item.details" :key="detail" class="detail">
							{{ detail }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import me from '../models/aboutMe.js';
	export default {
		name: 'ResumeComponent',
		data() {
			return {
				me: me,
			};
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.pr-2 {
		padding-right: 5px;
	}
	.resume {
		border: 1px solid var(--Dark-Blue);
		padding: 20px;
	}
	.header {
		display: grid;
		grid-template-areas: 'c b a';
	}

	.header .contact-section {
		grid-area: a;
	}

	.header .image-section {
		grid-area: b;
		display: flex;
		justify-content: center;
	}
	.header .links-section {
		grid-area: c;
	}
	.profile-img {
		max-width: 160px;
	}
	.links .link {
		list-style: none;
	}
	a {
		color: var(--Blue);
		text-decoration: none;
	}
	h4 {
		color: var(--Blue);
		margin: 20px 0 5px;
		padding-bottom: 4px;
		border-bottom: 1px solid var(--Blue);
	}
	.highlight {
		position: relative;
	}
	.highlight::after {
		content: '';
		position: absolute;
		width: 85px;
		height: 0.9rem;
		background-color: var(--Orange);
		top: 8px;
		left: 24px;
		z-index: -1;
	}
	.skill-category {
		margin: 15px 0 0;

		text-decoration: underline;
	}
	.skill:first-of-type {
		padding-left: 10px;
	}
	.skill {
		font-size: 0.9rem;
	}

	.text-left {
		text-align: left;
	}
	.text-right {
		text-align: right;
	}
	.experience .left,
	.education .left {
		float: left;
	}
	.experience .right,
	.education .right {
		float: right;
	}
	.bottom {
		display: grid;
		grid-template-areas: 'exp exp edu';
	}
	.experience {
		grid-area: exp;
		padding-right: 10px;
	}
	.education {
		grid-area: edu;
	}
	@media screen and (max-width: 900px) {
		.header .links-section {
			text-align: left;
		}
		.bottom {
			grid-template-areas:
				'exp'
				'edu';
		}
	}
	@media screen and (max-width: 700px) {
		.header {
			grid-template-areas:
				'b b'
				'a c';
			.image-section {
				display: flex;
				justify-content: center;
				margin-bottom: 5px;
			}
			.contact-section {
				text-align: left;
			}
			.links-section.text-left {
				text-align: right;
			}
		}

		.skill {
			display: block;
			font-size: 0.8rem;
			&:first-of-type {
				padding: 0;
			}
			.detail {
				font-size: 0.8rem;
			}
			.skill-comma {
				display: none;
			}
		}
	}
</style>
