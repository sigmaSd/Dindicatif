pub struct ProgressBar {
    inner: indicatif::ProgressBar,
}
#[no_mangle]
pub fn new(len: u64) -> *mut ProgressBar {
    Box::into_raw(Box::new(ProgressBar {
        inner: indicatif::ProgressBar::new(len),
    }))
}
#[no_mangle]
pub fn inc(bar: *mut ProgressBar, n: u64) {
    unsafe { (&mut *bar).inner.inc(n) };
}
