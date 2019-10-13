export default function(original, ...otherObjects) {
    const copied = {...original, ...otherObjects};
    copied.__proto__ = original.__proto__;
    return copied;
}