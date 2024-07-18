import SkeletonContent from 'react-native-skeleton-content';
const Placeholder: React.FC = () => {
    return (
        <SkeletonContent
            containerStyle={{ flex: 1, width: 300 }}
            isLoading={true}
        />
    )
}

export default Placeholder