'use client'

import { useState } from 'react'

interface Skill {
	src: string
	label: string
	svg?: string
}

interface SkillCategory {
	title: string
	emoji: string
	skills: Skill[]
	gradient: string
}

const skillCategories: SkillCategory[] = [
	{
		title: 'Tools & DevOps',
		emoji: '✅',
		gradient: 'from-emerald-500/20 to-teal-500/20',
		skills: [
			{ src: 'git', label: 'Git' },
			{ src: 'github', label: 'GitHub' },
			{ src: 'docker', label: 'Docker' },
			{ src: 'linux', label: 'Linux' },
			{ src: 'postman', label: 'Postman' },
		],
	},
	{
		title: 'Frontend',
		emoji: '🎨',
		gradient: 'from-blue-500/20 to-cyan-500/20',
		skills: [
			{ src: 'html', label: 'HTML' },
			{ src: 'css', label: 'CSS' },
			{ src: 'js', label: 'JavaScript' },
			{ src: 'ts', label: 'TypeScript' },
			{ src: 'react', label: 'React' },
			{ src: 'nextjs', label: 'Next.js' },
			{ src: 'angular', label: 'Angular' },
			{ src: 'nuxtjs', label: 'Nuxt.js' },
			{ src: 'sass', label: 'Sass' },
			{ src: 'tailwind', label: 'Tailwind CSS' },
			{ src: 'redux', label: 'Redux' },
			{ src: 'threejs', label: 'Three.js' },
			{ src: 'vite', label: 'Vite' },
			{
				src: 'bootstrap',
				label: 'Bootstrap',
			},
			{
				src: 'materialui',
				label: 'Material UI',
			},
			{
				src: 'chakraui',
				label: 'Chakra UI',
				svg: '<svg role="img" color="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Chakra UI</title><path d="M7.678 1.583a3.492 3.492 0 0 0-3.03 1.76L.265 10.997a2.035 2.035 0 0 0-.064 1.886l4.486 7.784a3.493 3.493 0 0 0 3.03 1.751l8.602-.01a3.495 3.495 0 0 0 3.026-1.759l4.39-7.655a2.025 2.025 0 0 0-.002-2.008L19.339 3.34a3.494 3.494 0 0 0-3.028-1.756Zm4.365 1.244V9.11c0 .32.226.595.54.656l6.089 1.187c-2.005 3.466-4.006 6.934-6.008 10.4-.17.296-.62.176-.62-.166v-6.286a.667.667 0 0 0-.538-.656l-6.072-1.193 5.988-10.393c.168-.29.621-.178.621.168z"/></svg>',
			},
			{
				src: 'antdesign',
				label: 'Ant Design',
				svg: '<svg role="img" color="blue" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Ant Design</title><path d="M17.4511 6.6808c.5091-.5064.5091-1.3316 0-1.838l-1.8729-1.873.0027.0027c-.4957-.4957-1.3478-1.3478-2.5535-2.5508-.568-.5547-1.487-.5493-2.0498.0134L.426 10.9787a1.4426 1.4426 0 0 0 0 2.047l10.549 10.541a1.4506 1.4506 0 0 0 2.0497 0l4.4238-4.4211c.509-.5064.509-1.3317 0-1.8381a1.3049 1.3049 0 0 0-1.8408 0l-3.3493 3.3546c-.1393.1394-.3564.1394-.4957 0l-8.4268-8.4188c-.1394-.1393-.1394-.3563 0-.4956L11.76 3.3289c.0107-.0108.0241-.0188.0349-.0295.1393-.1099.3322-.0992.4608.0295l3.3547 3.352c.509.509 1.3343.509 1.8407 0zm-8.2446 5.375a2.8482 2.8456 0 1 0 5.6965 0 2.8482 2.8456 0 1 0-5.6965 0zm14.3672-1.0343l-3.293-3.277c-.5092-.5063-1.3344-.5063-1.8408.0028a1.2968 1.2968 0 0 0 0 1.838l2.2239 2.2213c.1393.1393.1393.3564 0 .4957l-2.1918 2.189a1.2968 1.2968 0 0 0 0 1.8382 1.3049 1.3049 0 0 0 1.8408 0l3.2635-3.2609a1.445 1.445 0 0 0-.0026-2.047Z"/></svg>',
			},
			{
				src: 'vue',
				label: 'Vue.js',
			},
		],
	},
	{
		title: 'Backend',
		emoji: '⚙️',
		gradient: 'from-purple-500/20 to-pink-500/20',
		skills: [
			{ src: 'nodejs', label: 'Node.js' },
			{ src: 'express', label: 'Express.js' },
			{ src: 'nestjs', label: 'NestJS' },
			{ src: 'php', label: 'PHP' },
			{ src: 'django', label: 'Django' },
			{ src: 'py', label: 'Python' },
			{
				src: 'fastapi',
				label: 'FastAPI',
			},
		],
	},
	{
		title: 'Databases',
		emoji: '📊',
		gradient: 'from-orange-500/20 to-red-500/20',
		skills: [
			{ src: 'mysql', label: 'MySQL' },
			{ src: 'mongodb', label: 'MongoDB' },
			{ src: 'postgres', label: 'PostgreSQL' },
			{ src: 'prisma', label: 'Prisma' },
			{ src: 'firebase', label: 'Firebase' },
			{ src: 'supabase', label: 'Supabase' },
		],
	},
	{
		title: 'AI / ML',
		emoji: '🧠',
		gradient: 'from-violet-500/20 to-purple-500/20',
		skills: [{ src: 'tensorflow', label: 'TensorFlow' }],
	},
	{
		title: 'Mobile Development',
		emoji: '📱',
		gradient: 'from-yellow-500/20 to-orange-500/20',
		skills: [
			{
				src: 'expo',
				label: 'Expo',
				svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Expo</title><path d="M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.078-.8-1.23-1.044-1.498-2.397-1.542h-1.032c-1.353.044-1.597.311-2.398 1.542C8.267 3.991.33 18.758 0 19.77Z"/></svg>',
			},
			{
				src: 'reactnative',
				label: 'React Native',
				svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>React</title><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z"/></svg>',
			},
			{ src: 'flutter', label: 'Flutter' },
			{ src: 'dart', label: 'Dart' },
			{
				src: 'android',
				label: 'Android',
				svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Android</title><path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z"/></svg>',
			},
			{
				src: 'ios',
				label: 'iOS',
				svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Apple</title><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>',
			},
		],
	},

	{
		title: 'IDE & Utilities',
		emoji: '🛠️',
		gradient: 'from-indigo-500/20 to-blue-500/20',
		skills: [
			{ src: 'vscode', label: 'VS Code' },
			{ src: 'webstorm', label: 'WebStorm' },
		],
	},
	{
		title: 'Deployment',
		emoji: '☁️',
		gradient: 'from-sky-500/20 to-blue-500/20',
		skills: [
			{ src: 'vercel', label: 'Vercel' },
			{ src: 'heroku', label: 'Heroku' },
			{ src: 'netlify', label: 'Netlify' },
		],
	},
	{
		title: 'Communication',
		emoji: '💌',
		gradient: 'from-pink-500/20 to-rose-500/20',
		skills: [
			{ src: 'gmail', label: 'Gmail' },
			{ src: 'linkedin', label: 'LinkedIn' },
			{
				src: 'telegram',
				label: 'Telegram',
				svg: '<svg role="img" color="blue" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
			},
			{
				src: 'whatsapp',
				label: 'WhatsApp',
				svg: '<svg role="img" color="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>',
			},
			{ src: 'twitter', label: 'Twitter' },
			{
				src: 'instagram',
				label: 'Instagram',
			},
		],
	},
	{
		title: 'Misc',
		emoji: '📦',
		gradient: 'from-amber-500/20 to-orange-500/20',
		skills: [
			{ src: 'notion', label: 'Notion' },
			{
				src: 'canva',
				label: 'Canva',
				svg: '<svg role="img"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Canva</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z"/></svg>',
			},
		],
	},
]

export default function SkillsShowcase() {
	const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

	return (
		<div>
			<div className='max-w-7xl mx-auto'>
				<div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl'>
					{/* Animated background elements */}
					<div className='absolute inset-0 overflow-hidden'>
						<div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse'></div>
						<div
							className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse'
							style={{ animationDelay: '1s' }}
						></div>
					</div>

					<div className='relative p-8 md:p-12'>
						{/* Header */}
						<div className='text-center mb-16'>
							<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 animate-fade-in'>
								My Skills Showcase
							</h1>
							<div className='w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full'></div>
						</div>

						{/* Skills Grid */}
						<div className='space-y-12'>
							{skillCategories.map((category, categoryIndex) => (
								<div
									key={category.title}
									className='group animate-fade-up'
									style={{ animationDelay: `${categoryIndex * 0.1}s` }}
								>
									{/* Category Header */}
									<div className='flex items-center gap-4 mb-8'>
										<div
											className='text-3xl animate-bounce'
											style={{ animationDelay: `${categoryIndex * 0.2}s` }}
										>
											{category.emoji}
										</div>
										<h2 className='text-2xl md:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300'>
											{category.title}
										</h2>
										<div className='flex-1 h-px bg-gradient-to-r from-white/30 to-transparent'></div>
									</div>

									{/* Skills Container */}
									<div
										className={`relative rounded-2xl bg-gradient-to-br ${category.gradient} backdrop-blur-sm border border-white/10 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]`}
									>
										<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6'>
											{category.skills.map((skill, skillIndex) => (
												<div
													key={skill.src}
													className='relative group/skill cursor-pointer animate-fade-up'
													style={{
														animationDelay: `${
															categoryIndex * 0.1 + skillIndex * 0.05
														}s`,
													}}
													onMouseEnter={() =>
														setHoveredSkill(`${category.title}-${skill.src}`)
													}
													onMouseLeave={() => setHoveredSkill(null)}
												>
													{/* Skill Item */}
													<div className='relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10'>
														{/* Glow effect */}
														<div className='absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 blur-sm'></div>

														{/* Icon container */}
														<div className='relative z-10 transform transition-transform duration-300 group-hover/skill:rotate-12 group-hover/skill:scale-110'>
															{skill.svg ? (
																<div
																	className='w-12 h-12 md:w-14 md:h-14 drop-shadow-lg text-white flex items-center justify-center'
																	dangerouslySetInnerHTML={{
																		__html: skill.svg.replace(
																			'<svg',
																			'<svg class="w-full h-full" fill="currentColor"'
																		),
																	}}
																/>
															) : (
																<img
																	src={`https://skillicons.dev/icons?i=${skill.src}`}
																	alt={skill.label}
																	className='w-12 h-12 md:w-14 md:h-14 drop-shadow-lg'
																/>
															)}

															{/* Animated ring */}
															<div className='absolute inset-0 rounded-full border-2 border-purple-400/50 scale-125 opacity-0 group-hover/skill:opacity-100 group-hover/skill:animate-ping'></div>
														</div>

														{/* Label */}
														<span className='relative z-10 text-sm md:text-base font-medium text-white/90 group-hover/skill:text-white transition-colors duration-300 text-center'>
															{skill.label}
														</span>

														{/* Hover tooltip */}
														{hoveredSkill ===
															`${category.title}-${skill.src}` && (
															<div className='absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap animate-fade-in z-20'>
																{skill.label}
																<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80'></div>
															</div>
														)}
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Footer */}
					</div>
				</div>
			</div>
		</div>
	)
}
