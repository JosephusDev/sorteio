import Svg, { Path, Rect, SvgProps } from "react-native-svg";
import { View } from "react-native";
import { cn } from "@/utils/cn";

type IconProps = SvgProps & {
  className?: string;
};

export const BellIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Path
          d="M11.9623 17.9861H18.7715C19.0367 18.0009 19.3014 17.9476 19.5401 17.8311C19.7788 17.7146 19.9837 17.5389 20.1352 17.3207C20.2868 17.1026 20.38 16.8493 20.406 16.585C20.432 16.3206 20.3898 16.0541 20.2835 15.8106C19.9245 14.7229 18.4887 13.4176 18.4887 12.134C18.4887 9.28415 18.4887 8.53361 17.0855 6.85847C16.6306 6.31932 16.0672 5.88198 15.4321 5.57493L14.6489 5.19422C14.5172 5.11567 14.4034 5.01012 14.3153 4.88451C14.2273 4.75892 14.1667 4.61609 14.1377 4.46542C14.0596 3.95781 13.7914 3.4989 13.3873 3.18178C12.9833 2.86465 12.4739 2.71303 11.9623 2.75766C11.4595 2.72728 10.9636 2.88545 10.5713 3.20127C10.1791 3.5171 9.91866 3.96784 9.84113 4.46542C9.80599 4.62092 9.7371 4.76682 9.63938 4.89276C9.54163 5.01869 9.4174 5.12161 9.27548 5.19422L8.4923 5.57493C7.8572 5.88198 7.29385 6.31932 6.83892 6.85847C5.43572 8.53361 5.43572 9.28415 5.43572 12.134C5.43572 13.4176 4.06516 14.5923 3.70621 15.7454C3.48865 16.4415 3.369 17.9861 5.18554 17.9861H11.9623Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M15.2254 17.9861C15.2342 18.4171 15.156 18.8455 14.9951 19.2453C14.8343 19.6453 14.5943 20.0086 14.2895 20.3134C13.9846 20.6182 13.6213 20.8582 13.2214 21.0191C12.8214 21.18 12.3932 21.2583 11.9622 21.2493C11.5312 21.2583 11.1029 21.18 10.7029 21.0191C10.303 20.8582 9.93969 20.6182 9.63491 20.3134C9.3301 20.0086 9.09006 19.6453 8.92922 19.2453C8.76837 18.8455 8.69004 18.4171 8.69892 17.9861"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const NoteWithTextIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Path
          d="M21.25 6.86111V13.2025C21.2502 13.4737 21.1967 13.7423 21.0927 13.9928C20.9886 14.2433 20.836 14.4707 20.6436 14.6619L14.6619 20.6436C14.4707 20.836 14.2433 20.9886 13.9928 21.0927C13.7423 21.1967 13.4737 21.2502 13.2025 21.25H6.86111C5.77078 21.25 4.7251 20.8169 3.95412 20.0459C3.18313 19.2749 2.75 18.2292 2.75 17.1389V6.86111C2.75 5.77078 3.18313 4.7251 3.95412 3.95412C4.7251 3.18313 5.77078 2.75 6.86111 2.75H17.1389C18.2292 2.75 19.2749 3.18313 20.0459 3.95412C20.8169 4.7251 21.25 5.77078 21.25 6.86111Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.0556 21.0753L13.5417 16.9642C13.4832 16.4981 13.532 16.0248 13.6844 15.5804C13.8367 15.1361 14.0886 14.7324 14.4208 14.4002C14.753 14.0681 15.1566 13.8162 15.601 13.6638C16.0453 13.5115 16.5186 13.4626 16.9847 13.5211L21.0958 14.035"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M6.86108 7.88892H16.1111"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M6.86108 12H10.9722"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M6.86108 16.1111H9.94442"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const EyeClosedIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="20"
        height="20"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Path
          d="M20.645 7C19.9136 9.0494 18.6869 10.8134 17.111 12.0821C15.6182 13.2944 13.8251 13.9169 12 13.8565C10.1748 13.9169 8.38178 13.2944 6.88898 12.0821C5.31302 10.8134 4.08637 9.0494 3.35498 7"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12 13.8565V17"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17.7 15.9047L15.781 12.9584"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.21899 12.9584L6.29999 15.9047"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M21.5 11.5235L19.315 9.63965"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M4.685 9.63965L2.5 11.5235"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const EyeIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="20"
        height="20"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Path
          d="M2.89899 12.7346C2.80091 12.5052 2.75 12.2542 2.75 12C2.75 11.7458 2.80091 11.4948 2.89899 11.2654C3.70725 9.34502 4.99868 7.72989 6.61515 6.61781C8.23161 5.50574 10.1029 4.945 12 5.00426C13.8971 4.945 15.7684 5.50574 17.3849 6.61781C19.0013 7.72989 20.2928 9.34502 21.101 11.2654C21.1991 11.4948 21.25 11.7458 21.25 12C21.25 12.2542 21.1991 12.5052 21.101 12.7346C20.2928 14.655 19.0013 16.2701 17.3849 17.3822C15.7684 18.4943 13.8971 19.055 12 18.9957C10.1029 19.055 8.23161 18.4943 6.61515 17.3822C4.99868 16.2701 3.70725 14.655 2.89899 12.7346Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const EyeOffIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="20"
        height="20"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Path
          d="M5.45 16.92C4.34837 15.8766 3.47942 14.6123 2.9 13.21C2.80095 12.9794 2.74988 12.731 2.74988 12.48C2.74988 12.229 2.80095 11.9806 2.9 11.75C3.66971 9.87608 4.96076 8.26226 6.62 7.09998C8.1945 5.99969 10.0797 5.43202 12 5.47998C13.3815 5.44566 14.7518 5.73684 16 6.32998"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.56 8.04999C19.6553 9.09282 20.5204 10.3531 21.1 11.75C21.199 11.9806 21.2501 12.229 21.2501 12.48C21.2501 12.731 21.199 12.9794 21.1 13.21C20.3303 15.0839 19.0392 16.6977 17.38 17.86C15.8055 18.9603 13.9203 19.5279 12 19.48C10.6185 19.5143 9.24821 19.2231 8 18.63"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.70997 13.65C8.5693 13.2761 8.49813 12.8796 8.49997 12.48C8.49997 11.5518 8.86872 10.6615 9.5251 10.0051C10.1815 9.34876 11.0717 8.98002 12 8.98002C12.3995 8.97817 12.796 9.04934 13.17 9.19002"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M15.29 11.31C15.4307 11.684 15.5019 12.0805 15.5 12.48C15.5 13.4083 15.1313 14.2985 14.4749 14.9549C13.8185 15.6112 12.9283 15.98 12 15.98C11.6005 15.9818 11.204 15.9107 10.83 15.77"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3 20L19 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const EmailIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="20"
        height="20"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Rect
          x="2.68159"
          y="3.5"
          width="18.5"
          height="17"
          rx="4"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <Path
          d="M2.72875 7.58978L9.93399 11.7198C10.5383 12.0709 11.2238 12.2557 11.9216 12.2557C12.6195 12.2557 13.305 12.0709 13.9093 11.7198L21.1344 7.58978"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const PhoneIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="20"
        height="20"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Path
          d="M12.7354 20.1912C12.4288 20.0506 12.1222 19.91 11.8155 19.7438C10.3132 18.8948 8.93344 17.8452 7.71409 16.6237C6.13308 15.1347 4.83446 13.3715 3.88102 11.4195C3.37018 10.371 3.02534 9.24943 2.85888 8.09491C2.63218 6.92878 2.76129 5.72138 3.2294 4.62967C3.5179 4.1606 3.86576 3.73081 4.26434 3.35098C4.4259 3.16987 4.62235 3.02329 4.84191 2.92002C5.06145 2.81674 5.29959 2.75891 5.54202 2.75C6.04667 2.82558 6.50357 3.09079 6.81971 3.49163C7.50966 4.25884 8.25073 4.94934 8.97901 5.67819C9.26577 5.92439 9.44467 6.27328 9.47731 6.64999C9.46502 6.96695 9.34308 7.26979 9.13234 7.50671C8.88958 7.8136 8.5957 8.09491 8.31461 8.389C8.14496 8.55247 8.01523 8.75286 7.93546 8.97461C7.85569 9.19636 7.82804 9.43352 7.85464 9.66769C8.03017 10.2161 8.33217 10.7154 8.73625 11.1254C9.22177 11.7903 9.70729 12.4041 10.2566 13.0562C11.2438 14.1969 12.4141 15.1649 13.7192 15.9205C13.8996 16.0569 14.1129 16.143 14.3373 16.1699C14.5618 16.1969 14.7895 16.1638 14.9969 16.0739C15.4308 15.831 15.8162 15.5103 16.1341 15.1276C16.4089 14.7926 16.8028 14.5773 17.2329 14.5267C17.6156 14.5462 17.9765 14.7108 18.2423 14.987C18.5872 15.2812 18.8811 15.6264 19.2006 15.946C19.52 16.2657 19.7755 16.4959 20.0438 16.79C20.3651 17.0731 20.668 17.3764 20.9509 17.6979C21.1704 17.9817 21.2752 18.3377 21.2449 18.6952C21.131 19.1226 20.885 19.503 20.5422 19.7822C20.0598 20.2841 19.4737 20.6748 18.8249 20.9265C18.1761 21.1783 17.4801 21.2852 16.7857 21.2398C15.3798 21.1609 14.0033 20.8046 12.7354 20.1912Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
      </Svg>
    </View>
  );
};

export const LogouIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Path
          d="M13.4767 21.2448H8.34067C7.04877 21.3045 5.78536 20.8527 4.82407 19.9876C3.86278 19.1224 3.28099 17.9134 3.2047 16.6224V7.37762C3.28099 6.08659 3.86278 4.87757 4.82407 4.01241C5.78536 3.14724 7.04877 2.69559 8.34067 2.75524H13.4767"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M20.7953 12H7.44174"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <Path
          d="M16.0833 17.136L20.4874 12.7319C20.6802 12.5371 20.7884 12.2742 20.7884 12C20.7884 11.7259 20.6802 11.4629 20.4874 11.2681L16.0833 6.86404"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const ChevronLeftIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        strokeWidth={2}
        viewBox="0 0 24 24"
        fill="none"
        color="#212121"
        {...props}
      >
        <Path
          d="M15.5831 4L8.9964 10.5866C8.62508 10.9633 8.41693 11.471 8.41693 12C8.41693 12.529 8.62508 13.0367 8.9964 13.4134L15.5831 20"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const ChevronRightIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        fill="none"
        color="#676767"
        {...props}
      >
        <Path
          d="M8.41692 20L15.0036 13.4134C15.3749 13.0367 15.5831 12.529 15.5831 12C15.5831 11.471 15.3749 10.9633 15.0036 10.5866L8.41692 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const SettingsIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        color="#676767"
        {...props}
      >
        <Path
          d="M12.132 15.4039C13.9898 15.4039 15.4958 13.8979 15.4958 12.0402C15.4958 10.1824 13.9898 8.67642 12.132 8.67642C10.2743 8.67642 8.76828 10.1824 8.76828 12.0402C8.76828 13.8979 10.2743 15.4039 12.132 15.4039Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M20.9834 15.094C20.5864 16.2329 19.9745 17.2853 19.181 18.1937L17.0571 17.7115C16.2517 18.4346 15.2945 18.9681 14.2559 19.2727L13.6819 21.3507C13.1438 21.4475 12.5983 21.4974 12.0517 21.5C11.3679 21.4999 10.6862 21.4228 10.0197 21.2703L9.41117 19.1236C8.50337 18.7897 7.66902 18.2828 6.95437 17.631L4.85347 18.1706C4.01977 17.1983 3.39458 16.0651 3.01662 14.8414L4.56646 13.1194C4.50763 12.7395 4.47692 12.3557 4.47462 11.9712C4.47515 11.4657 4.52902 10.9617 4.63535 10.4674L3.10846 8.87159C3.55167 7.62023 4.25608 6.4775 5.17493 5.51933L7.34471 6.05891C7.94202 5.57995 8.60757 5.19299 9.31932 4.91088L9.89335 2.78701C10.602 2.60229 11.3308 2.50589 12.0631 2.5C12.6484 2.50063 13.2325 2.55443 13.8081 2.66073L14.3592 4.77311C15.1898 5.04156 15.9668 5.45343 16.6553 5.99003L18.8365 5.42749C19.7177 6.31405 20.4124 7.36797 20.88 8.52718L19.3991 10.1344C19.6798 11.2356 19.7034 12.3865 19.4679 13.4982L20.9834 15.094Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const TrashIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        color="#DA4BDD"
        {...props}
      >
        <Path
          d="M5.47058 6.01471V18.5294C5.47058 19.251 5.75721 19.943 6.26742 20.4532C6.77763 20.9634 7.46962 21.25 8.19117 21.25H15.8088C16.5304 21.25 17.2224 20.9634 17.7326 20.4532C18.2428 19.943 18.5294 19.251 18.5294 18.5294V6.01471"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3.29411 6.01471H20.7059"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.73529 6.01471V4.38235C8.73529 3.94943 8.90727 3.53423 9.2134 3.2281C9.51952 2.92198 9.93472 2.75 10.3676 2.75H13.6323C14.0653 2.75 14.4805 2.92198 14.7866 3.2281C15.0927 3.53423 15.2647 3.94943 15.2647 4.38235V6.01471"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const BasketIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        color="#DA4BDD"
        {...props}
      >
        <Path
          d="M19.2975 9.5658H4.70252C4.40682 9.56638 4.1151 9.63368 3.84929 9.76263C3.58347 9.89159 3.35049 10.0788 3.16784 10.3103C2.98519 10.5418 2.85763 10.8115 2.79475 11.0991C2.73187 11.3867 2.7353 11.6847 2.80479 11.9708L4.36993 18.3776C4.59538 19.2025 5.08722 19.9307 5.7696 20.4498C6.45198 20.9689 7.28699 21.2501 8.14584 21.25H15.8542C16.713 21.2501 17.548 20.9689 18.2304 20.4498C18.9128 19.9307 19.4046 19.2025 19.6301 18.3776L21.1952 11.9708C21.2647 11.6847 21.2681 11.3867 21.2053 11.0991C21.1424 10.8115 21.0148 10.5418 20.8322 10.3103C20.6495 10.0788 20.4165 9.89159 20.1507 9.76263C19.8849 9.63368 19.5932 9.56638 19.2975 9.5658Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.08721 13.4605V17.3552"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12 13.4605V17.3552"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M15.9129 13.4605V17.3552"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.8475 9.56579C18.8475 7.75813 18.1261 6.02451 16.842 4.7463C15.5578 3.46809 13.8161 2.75 12 2.75C10.184 2.75 8.44228 3.46809 7.15813 4.7463C5.87397 6.02451 5.15254 7.75813 5.15254 9.56579"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const CaretDownIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        color="#D93A4A"
        {...props}
      >
        <Path
          d="M19.6964 8.71988C19.6618 8.95814 19.5575 9.18084 19.3965 9.35989L13.3065 16.1199C13.1462 16.3107 12.9488 16.4672 12.7264 16.5799C12.4988 16.6902 12.2494 16.7482 11.9965 16.7499C11.759 16.7537 11.5237 16.706 11.3065 16.6099C11.072 16.5163 10.8605 16.373 10.6865 16.1899L4.58643 9.35989C4.42472 9.18012 4.31731 8.95821 4.2765 8.71988C4.24315 8.47852 4.27776 8.23265 4.37647 8.00989C4.4723 7.78526 4.63228 7.59393 4.83643 7.4599C5.04044 7.33078 5.2752 7.25828 5.51649 7.24988H18.5165C18.758 7.25681 18.993 7.32943 19.1964 7.4599C19.4016 7.59548 19.5646 7.78607 19.6665 8.00989C19.7474 8.23822 19.7577 8.48554 19.6964 8.71988Z"
          fill="currentColor"
        />
      </Svg>
    </View>
  );
};

export const CaretUpIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        color="#1FA342"
        {...props}
      >
        <Path
          d="M19.66 16.01C19.5548 16.229 19.3924 16.4156 19.19 16.55C18.9871 16.6804 18.7511 16.7498 18.51 16.75H5.50995C5.26565 16.75 5.02643 16.6807 4.82001 16.55C4.61785 16.4161 4.45785 16.2275 4.35871 16.0062C4.25957 15.7849 4.22531 15.54 4.25995 15.3C4.29841 15.058 4.40613 14.8322 4.57001 14.65L10.66 7.88C10.8185 7.68979 11.0164 7.53627 11.2401 7.43002C11.4683 7.32014 11.7169 7.25883 11.97 7.25C12.223 7.25276 12.4735 7.30017 12.71 7.39001C12.9401 7.49114 13.1475 7.63735 13.32 7.82001L19.43 14.65C19.5927 14.8318 19.6973 15.0582 19.73 15.3C19.7768 15.5384 19.7524 15.7853 19.66 16.01Z"
          fill="currentColor"
        />
      </Svg>
    </View>
  );
};

export const PlusIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        {...props}
      >
        <Path
          d="M12 4.5V19.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M19.5 12H4.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const LockIcon = ({ ...props }: SvgProps) => {
  return (
    <View>
      <Svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        color="#676767"
        {...props}
      >
        <Path
          d="M17 9.6875H7C5.61929 9.6875 4.5 10.7228 4.5 12V18.9375C4.5 20.2147 5.61929 21.25 7 21.25H17C18.3807 21.25 19.5 20.2147 19.5 18.9375V12C19.5 10.7228 18.3807 9.6875 17 9.6875Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M7.375 9.6875V7.375C7.375 6.14837 7.86228 4.97199 8.72963 4.10463C9.59699 3.23728 10.7734 2.75 12 2.75C13.2266 2.75 14.403 3.23728 15.2704 4.10463C16.1377 4.97199 16.625 6.14837 16.625 7.375V9.6875"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.53128 17.7812H15.4688"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const XIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        color={"#676767"}
        strokeWidth={1.5}
        {...props}
      >
        <Path
          d="M19 5L5 19"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M19 19L5 5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const MoneyIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        color={"#676767"}
        strokeWidth={1.5}
        {...props}
      >
        <Path
          d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M9 14.4326C9.0638 15.1686 9.41382 15.8501 9.97482 16.3307C10.5358 16.8113 11.263 17.0525 12 17.0026C14.42 17.0026 15 15.6126 15 14.4326C15 13.2526 14 12.0026 12 12.0026C10 12.0026 9 11.2126 9 9.60263C9.01865 9.23224 9.11202 8.86946 9.2745 8.53609C9.43698 8.20272 9.66521 7.90566 9.94546 7.66278C10.2257 7.41989 10.5522 7.2362 10.9053 7.12275C11.2583 7.00931 11.6307 6.96845 12 7.00263C12.7375 6.97087 13.4592 7.22254 14.0171 7.70601C14.5749 8.18948 14.9266 8.86809 15 9.60263"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12 18.5V17.1991M12 5.5V6.99887"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const CalendarIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        color={"#676767"}
        strokeWidth={1.5}
        {...props}
      >
        <Path
          d="M17 4.625H7C4.79086 4.625 3 6.41586 3 8.625V17.375C3 19.5841 4.79086 21.375 7 21.375H17C19.2091 21.375 21 19.5841 21 17.375V8.625C21 6.41586 19.2091 4.625 17 4.625Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3 10.625H21"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17 2.625V6.625"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M7 2.625V6.625"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const UserIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        color={"#676767"}
        strokeWidth={1.5}
        {...props}
      >
        <Path
          d="M19.6177 21.25C19.6177 17.6479 15.6021 14.7206 12 14.7206C8.39794 14.7206 4.38235 17.6479 4.38235 21.25"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12 11.4559C14.404 11.4559 16.3529 9.50701 16.3529 7.10294C16.3529 4.69888 14.404 2.75 12 2.75C9.59594 2.75 7.64706 4.69888 7.64706 7.10294C7.64706 9.50701 9.59594 11.4559 12 11.4559Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const TagIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        color={"#676767"}
        strokeWidth={1.5}
        {...props}
      >
        <Path
          d="M10.94 18.339L7.51 20.8869C7.26537 21.0782 6.9732 21.1993 6.66487 21.2372C6.35654 21.2751 6.0437 21.2284 5.75995 21.102C5.4762 20.9757 5.23225 20.7745 5.05432 20.5201C4.87638 20.2656 4.77118 19.9676 4.75 19.6579V6.34928C4.78647 5.35977 5.21452 4.42518 5.94014 3.75077C6.66575 3.07636 7.6296 2.71726 8.62 2.75235H15.38C16.3704 2.71726 17.3342 3.07636 18.0599 3.75077C18.7855 4.42518 19.2135 5.35977 19.25 6.34928V19.6579C19.2288 19.9676 19.1236 20.2656 18.9457 20.5201C18.7677 20.7745 18.5238 20.9757 18.24 21.102C17.9563 21.2284 17.6435 21.2751 17.3351 21.2372C17.0268 21.1993 16.7346 21.0782 16.49 20.8869L13.06 18.339C12.7521 18.1149 12.381 17.9941 12 17.9941C11.619 17.9941 11.2479 18.1149 10.94 18.339Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const CheckIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        color="#DA4BDD"
        {...props}
      >
        <Path
          d="M4.5 11.7948L8.72144 16.0163C8.86993 16.1666 9.04677 16.286 9.24172 16.3674C9.43668 16.4488 9.64586 16.4908 9.85715 16.4908C10.0685 16.4908 10.2776 16.4488 10.4726 16.3674C10.6675 16.286 10.8443 16.1666 10.9929 16.0163L19.5 7.50916"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export const ExclamationIcon = ({ className, ...props }: IconProps) => {
  return (
    <View className={cn(className)}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.6}
        color="#DA4BDD"
        {...props}
      >
        <Path
          d="M12 2.5C6.75326 2.5 2.5 6.75326 2.5 12C2.5 17.2467 6.75325 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75326 17.2467 2.5 12 2.5Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M11.9947 6.72221L11.9947 13.0555"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M12.0438 16.5574L12.0349 16.5574"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};
