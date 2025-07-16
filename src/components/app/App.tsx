import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from 'src/styles/index.module.scss';
import clsx from 'clsx';
import { CSSProperties, useState } from 'react';

export const App = () => {
	const [settings, setSettings] = useState(defaultArticleState);

	const handleConfirmSettings = (settings: ArticleStateType) => {
		setSettings(settings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm confirmSettings={handleConfirmSettings} />
			<Article />
		</main>
	);
};
