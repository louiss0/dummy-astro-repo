// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AllowedTailwindScreenWidths, FluidPercentages, SpacingNumbers } from 'libs/internal/src/misc/types';
import { EmitsOptions, FunctionalComponent, PropType } from 'vue';

type ContainerProps = {
  maxWidthClass?: `max-w-screen-${AllowedTailwindScreenWidths}`;
  widthClass?: `w-${FluidPercentages}`;
};

type ContainerSlots = {
  default(): void;
};

export const Container: FunctionalComponent<
  ContainerProps,
  EmitsOptions,
  ContainerSlots
> = ({ widthClass = "w-4/5", maxWidthClass = "max-w-screen-lg" }, { slots }) => {
  return (
    <div data-container class={['mx-auto lt-sm:w-full', widthClass, maxWidthClass]}>
      {slots.default()}
    </div>
  );
};

Container.props = {
  widthClass: {
    type: String as PropType<ContainerProps['widthClass']>,
    required: false,
  },
  maxWidthClass: {
    type: String as PropType<ContainerProps['maxWidthClass']>,
    required: false,
  },
};

type CenterProps = { gapClass?: `gap-${SpacingNumbers}` };
type CenterSlots = { default(): void };

export const Center: FunctionalComponent<
  CenterProps,
  EmitsOptions,
  CenterSlots
> = ({ gapClass }, { slots }) => {
  return (
    <div data-center-box class={`grid place-items-center ${gapClass || ''} `}>
      {slots.default()}
    </div>
  );
};

Center.props = ['gapClass'];

export const LocaleTime: FunctionalComponent<{
  dateString: string;
}> = ({ dateString }) => {
  const date = new Date(dateString);

  return <time datetime={date.toISOString()}>{date.toLocaleDateString()}</time>;
};

LocaleTime.props = {
  dateString: {
    type: String,
    validator: (value: unknown) => typeof value === 'string' && !isNaN(Date.parse(value)),
  },
};
