module.exports = function (grunt) {
	grunt.initConfig({
		conf: grunt.file.readJSON('configs/paths.json'),

		favicons: {
			options: {
				'html': '<%= conf.src %>/components/favicon/favicon.html',
				'HTMLPrefix': 'images/favicon/',
				'truncateHTML': true,
				'apple': true,
				'regular': true,
				'windowsTile': true,
				'firefox': true,
				'firefoxRound': true,
				'androidHomescreen': true,
			},
			icons: {
				src: '<%= conf.src %>/components/favicon/icon.png',
				dest: '<%= conf.dist %>/images/favicon/'
			}
		},
		fontface: {
			dist: {
				options: {
					fontDir: '<%= conf.src %>/fonts/',
					template: "@font-face {" +
					"font-family: '{{font}}';" +
					"src: url('../fonts/{{font}}.eot?#iefix') format('embedded-opentype')," +
					"url('../fonts/{{font}}.woff') format('woff')," +
					"url('../fonts/{{font}}.ttf')  format('truetype')," +
					"url('../fonts/{{font}}.svg#{{font}}') format('svg');" +
					"}",
					outputFile: '<%= conf.src %>/styles/_fonts.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-favicons');
	grunt.loadNpmTasks('grunt-fontface');
	grunt.registerTask('favicon', ['favicons:icons']);
	grunt.registerTask('fontgen', ['fontface:dist']);
};