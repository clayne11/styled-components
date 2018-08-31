import * as React from 'react'
import {
  StatelessComponent,
  Component as ReactComponent,
  ComponentClass,
  PureComponent,
  ReactElement,
  RefObject,
} from 'react'

export interface ThemeProps<TTheme> {
  theme: TTheme
}

export type ThemedStyledProps<TProps, TTheme> = TProps & ThemeProps<TTheme>
export type StyledProps<TProps> = ThemedStyledProps<TProps, any>

export type ThemedOuterStyledProps<TProps, TTheme> = TProps & {
  theme?: TTheme
  innerRef?:
    | ((instance: any) => void)
    | RefObject<HTMLElement | SVGElement | ReactComponent>
}
export type OuterStyledProps<TProps> = ThemedOuterStyledProps<TProps, any>

export type FalseyValue = undefined | null | false
export type Interpolation<P> =
  | FlattenInterpolation<P>
  | ReadonlyArray<
      FlattenInterpolation<P> | ReadonlyArray<FlattenInterpolation<P>>
    >
export type FlattenInterpolation<P> =
  | InterpolationValue
  | InterpolationFunction<P>
export type InterpolationValue =
  | string
  | number
  | Styles
  | FalseyValue
  | StyledComponentClass<any, any>
export type SimpleInterpolation =
  | InterpolationValue
  | ReadonlyArray<InterpolationValue | ReadonlyArray<InterpolationValue>>
export interface Styles {
  [ruleOrSelector: string]: string | number | Styles
}
export interface InterpolationFunction<TProps> {
  (props: TProps): Interpolation<TProps>
}

type Attrs<TProps, TAttrs extends Partial<TProps>, TTheme> =
  | ((props: ThemedStyledProps<TProps, TTheme>) => TAttrs)
  | {
      [K in keyof TAttrs]: ((props: ThemedStyledProps<TProps, TTheme>) => TAttrs[K]) | TAttrs[K]
    }

export interface StyledComponentClass<TProps, TTheme, TOuterProps = TProps>
  extends ComponentClass<ThemedOuterStyledProps<TOuterProps, TTheme>> {
  extend: ThemedStyledFunction<TProps, TTheme, TOuterProps>

  withComponent<K extends keyof JSX.IntrinsicElements>(
    tag: K
  ): StyledComponentClass<
    JSX.IntrinsicElements[K],
    TTheme,
    JSX.IntrinsicElements[K] & TOuterProps
  >
  withComponent<TComponentProps = {}>(
    element: React.ComponentType<TComponentProps>
  ): StyledComponentClass<TComponentProps, TTheme, TComponentProps & TOuterProps>
}

export interface ThemedStyledFunction<TProps, TTheme, TOuterProps = TProps> {
  (
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<ThemedStyledProps<TProps, TTheme>>[]
  ): StyledComponentClass<TProps, TTheme, TOuterProps>
  <TAdditionalProps>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<ThemedStyledProps<TProps & TAdditionalProps, TTheme>>[]
  ): StyledComponentClass<TProps & TAdditionalProps, TTheme, TOuterProps & TAdditionalProps>
  attrs<TAdditionalProps, TAttrs extends Partial<TProps & TAdditionalProps> = {}>(
    attrs: Attrs<TProps & TAdditionalProps, TAttrs, TTheme>
  ): ThemedStyledFunction<TProps & TAdditionalProps, TTheme, Omit<TProps & TAdditionalProps, keyof TAttrs>>
}

export type StyledFunction<TProps> = ThemedStyledFunction<TProps, any>

type ThemedStyledComponentFactories<TTheme> = {
  [TTag in keyof JSX.IntrinsicElements]: ThemedStyledFunction<
    JSX.IntrinsicElements[TTag],
    TTheme
  >
}

export interface ThemedBaseStyledInterface<TTheme>
  extends ThemedStyledComponentFactories<TTheme> {
  <TProps, TTag extends keyof JSX.IntrinsicElements>(
    tag: TTag
  ): ThemedStyledFunction<TProps, TTheme, TProps & JSX.IntrinsicElements[TTag]>
  <TProps, TOuterProps>(component: StyledComponentClass<TProps, TTheme, TOuterProps>): ThemedStyledFunction<
    TProps,
    TTheme,
    TOuterProps
  >
  <TProps extends { [prop: string]: any; theme?: TTheme }>(
    component: React.ComponentType<TProps>
  ): ThemedStyledFunction<TProps, TTheme, WithOptionalTheme<TProps, TTheme>>
}
export type BaseStyledInterface = ThemedBaseStyledInterface<any>

export type ThemedStyledInterface<TTheme> = ThemedBaseStyledInterface<TTheme>
export type StyledInterface = ThemedStyledInterface<any>

export interface ThemeProviderProps<TTheme> {
  theme?: TTheme | ((theme: TTheme) => TTheme)
}
export type ThemeProviderComponent<TTheme> = ComponentClass<ThemeProviderProps<TTheme>>

export interface ThemedCssFunction<TTheme> {
  (
    strings: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): InterpolationValue[]
  <TProps>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<ThemedStyledProps<TProps, TTheme>>[]
  ): FlattenInterpolation<ThemedStyledProps<TProps, TTheme>>[]
}

// Helper type operators
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type DiffBetween<T, U> = Pick<T, Exclude<keyof T, keyof U>> &
  Pick<U, Exclude<keyof U, keyof T>>
type WithOptionalTheme<TProps extends { theme?: TTheme }, TTheme> = Omit<TProps, 'theme'> & {
  theme?: TTheme
}

type foo = {
  one: string,
  two: number
}
type bar = {
  two: number
  three: string
}

export interface ThemedStyledComponentsModule<TTheme> {
  default: ThemedStyledInterface<TTheme>

  css: ThemedCssFunction<TTheme>
  keyframes(
    strings: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): string
  injectGlobal(
    strings: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): void
  withTheme<TProps extends { theme?: TTheme }>(
    component: React.ComponentType<TProps>
  ): ComponentClass<WithOptionalTheme<TProps, TTheme>>

  ThemeProvider: ThemeProviderComponent<TTheme>
}

declare const styled: StyledInterface

export const css: ThemedCssFunction<any>

export function withTheme<TProps extends { theme?: TTheme }, TTheme>(
  component: React.ComponentType<TProps>
): ComponentClass<WithOptionalTheme<TProps, TTheme>>

export function keyframes(
  strings: TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): string

export function injectGlobal(
  strings: TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): void

export function consolidateStreamedStyles(): void

export function isStyledComponent(target: any): target is StyledComponentClass<{}, {}>

export const ThemeProvider: ThemeProviderComponent<object>

interface StylesheetComponentProps {
  sheet: ServerStyleSheet
}

interface StyleSheetManagerProps {
  sheet?: StyleSheet
  target?: Node
}

export class StyleSheetManager extends React.Component<
  StyleSheetManagerProps,
  {}
> {}

export class ServerStyleSheet {
  collectStyles(tree: React.ReactNode): ReactElement<StylesheetComponentProps>

  getStyleTags(): string
  getStyleElement(): ReactElement<{}>[]
  interleaveWithNodeStream(
    readableStream: NodeJS.ReadableStream
  ): NodeJS.ReadableStream
  instance: StyleSheet
}

export default styled
