import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	fontColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { useClose } from '../hooks/useClose';

type FormProps = {
	confirmSettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ confirmSettings }: FormProps) => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [formSettings, setFormSettings] = useState(defaultArticleState);
	const formRef = useRef<HTMLFormElement>(null);

	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		backgroundColor,
		contentWidth,
	} = formSettings;

	const toggleForm = () => {
		setFormIsOpen((open) => !open);
	};

	const updateOption = (settings: Partial<ArticleStateType>) => {
		setFormSettings((prev) => ({ ...prev, ...settings }));
	};

	const handleFontFamilyOption = (value: OptionType) => {
		updateOption({ fontFamilyOption: value });
	};

	const handleFontSizeOption = (value: OptionType) => {
		updateOption({ fontSizeOption: value });
	};

	const handleFontColor = (value: OptionType) => {
		updateOption({ fontColor: value });
	};

	const handleBackgroundColor = (value: OptionType) => {
		updateOption({ backgroundColor: value });
	};

	const handleContentWidth = (value: OptionType) => {
		updateOption({ contentWidth: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		confirmSettings(formSettings);
		toggleForm();
	};

	const resetSettings = () => {
		confirmSettings(defaultArticleState);
		toggleForm();
	};

	useClose({
		isOpen: formIsOpen,
		close: () => setFormIsOpen(false),
		ref: formRef,
	});

	return (
		<>
			<ArrowButton isOpen={formIsOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleFontFamilyOption}
					/>

					<RadioGroup
						name='RadioGroup'
						selected={fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={handleFontSizeOption}
					/>

					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleFontColor}
					/>

					<Separator />

					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleBackgroundColor}
					/>

					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetSettings}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
